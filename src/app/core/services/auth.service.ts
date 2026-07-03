import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse, RefreshResponse } from '../models/user.model';

const GATEWAY_URL = 'http://localhost:3000';
const ACCESS_TOKEN_KEY = 'omrdesk_access_token';
const REFRESH_TOKEN_KEY = 'omrdesk_refresh_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<User | null>(null);
  private _refreshInProgress = false;
  private _refreshSubject = new BehaviorSubject<string | null>(null);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    // Restore session on app boot
    this.restoreSession();
  }

  // ─── Login ─────────────────────────────────────────────────────────────────

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${GATEWAY_URL}/api/auth/login`, credentials)
      .pipe(
        tap((res) => {
          this.saveTokens(res.accessToken, res.refreshToken);
          this._currentUser.set(res.user);
        }),
        catchError((err) => throwError(() => err)),
      );
  }

  // ─── Logout ─────────────────────────────────────────────────────────────────

  logout(): void {
    const userId = this._currentUser()?.id;
    if (userId) {
      // Fire-and-forget; clear tokens regardless of server response
      this.http
        .post(`${GATEWAY_URL}/api/auth/logout`, {}, {
          headers: { 'x-user-id': userId },
        })
        .subscribe({ error: () => {} });
    }
    this.clearSession();
    this.router.navigate(['/login']);
  }

  // ─── Token Management ───────────────────────────────────────────────────────

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  refreshAccessToken(): Observable<string> {
    if (this._refreshInProgress) {
      return new Observable((subscriber) => {
        const sub = this._refreshSubject.subscribe({
          next: (token) => {
            if (token) {
              subscriber.next(token);
              subscriber.complete();
            }
          },
          error: (err) => subscriber.error(err),
        });
        return () => sub.unsubscribe();
      });
    }

    this._refreshInProgress = true;
    this._refreshSubject.next(null);

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearSession();
      this.router.navigate(['/login']);
      return throwError(() => new Error('No refresh token'));
    }

    return this.http
      .post<RefreshResponse>(`${GATEWAY_URL}/api/auth/refresh`, { refreshToken })
      .pipe(
        tap((res) => {
          this.saveTokens(res.accessToken, res.refreshToken);
          this._refreshSubject.next(res.accessToken);
          this._refreshInProgress = false;
        }),
        catchError((err) => {
          this._refreshInProgress = false;
          this.clearSession();
          this.router.navigate(['/login']);
          return throwError(() => err);
        }),
      ) as unknown as Observable<string>;
  }

  // ─── Profile ─────────────────────────────────────────────────────────────────

  fetchMe(): Observable<User> {
    return this.http.get<User>(`${GATEWAY_URL}/api/auth/me`).pipe(
      tap((user) => this._currentUser.set(user)),
    );
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private saveTokens(access: string, refresh: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }

  private clearSession(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this._currentUser.set(null);
  }

  private restoreSession(): void {
    const token = this.getAccessToken();
    if (!token) return;

    // Verify the session is still valid by fetching the profile
    this.fetchMe().subscribe({
      error: () => {
        // Try refresh before giving up
        this.refreshAccessToken().subscribe({
          next: () => this.fetchMe().subscribe({ error: () => this.clearSession() }),
          error: () => this.clearSession(),
        });
      },
    });
  }
}
