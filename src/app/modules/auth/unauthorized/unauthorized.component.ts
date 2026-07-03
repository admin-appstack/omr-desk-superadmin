import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="unauth-page">
      <div class="unauth-card">
        <div class="icon-wrap">
          <mat-icon>gpp_bad</mat-icon>
        </div>
        <h1>Access Denied</h1>
        <p>Your account does not have <strong>Super Admin</strong> privileges required to access this portal.</p>
        <div class="actions">
          <button mat-stroked-button (click)="goBack()" id="unauth-back-btn">
            <mat-icon>arrow_back</mat-icon> Go Back
          </button>
          <button mat-flat-button color="primary" (click)="logout()" id="unauth-logout-btn">
            <mat-icon>logout</mat-icon> Sign Out
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; background: #0a0f1e; font-family: 'Inter', sans-serif; }
    .unauth-page { display: flex; align-items: center; justify-content: center; height: 100%; }
    .unauth-card {
      background: rgba(15,23,42,0.9);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px;
      padding: 56px 48px;
      text-align: center;
      max-width: 440px;
      backdrop-filter: blur(20px);
      box-shadow: 0 24px 64px rgba(0,0,0,0.6);
    }
    .icon-wrap {
      width: 80px; height: 80px;
      border-radius: 50%;
      background: rgba(239,68,68,0.12);
      border: 1px solid rgba(239,68,68,0.25);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 24px;
      mat-icon { font-size: 40px; width: 40px; height: 40px; color: #f87171; }
    }
    h1 { font-size: 24px; font-weight: 700; color: #f1f5f9; margin: 0 0 12px; }
    p { font-size: 14.5px; color: #64748b; line-height: 1.6; margin: 0 0 32px; }
    strong { color: #94a3b8; }
    .actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  `],
})
export class UnauthorizedComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  goBack(): void { this.router.navigate(['/login']); }
  logout(): void { this.authService.logout(); }
}
