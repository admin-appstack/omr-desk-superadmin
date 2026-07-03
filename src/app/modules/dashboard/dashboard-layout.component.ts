import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  isSidebarCollapsed = signal(false);

  mainNav = [
    { icon: 'dashboard',       label: 'Dashboard',         route: '/dashboard/home',      badge: null  },
    { icon: 'business',        label: 'Institutes',        route: '/dashboard/institutes', badge: null },
  ];

  managementNav = [
    { icon: 'view_module', label: 'Module Management', route: '/dashboard/modules', badge: null },
    { icon: 'card_membership', label: 'Subscription Management', route: '/dashboard/subscriptions', badge: null },
    { icon: 'admin_panel_settings', label: 'Role Management', route: '/dashboard/roles', badge: null },
    { icon: 'people', label: 'User Management', route: '/dashboard/users', badge: null },
    { icon: 'settings',  label: 'Settings',           route: '/dashboard/settings', badge: null },
  ];

  get navItems() { return [...this.mainNav, ...this.managementNav]; }

  // ─── Real user from AuthService ──────────────────────────────────────────
  readonly currentUser = computed(() => this.authService.currentUser());
  readonly displayName = computed(() => {
    const u = this.currentUser();
    return u ? `${u.firstName} ${u.lastName}` : 'Super Admin';
  });
  readonly displayRole = computed(() => {
    const u = this.currentUser();
    if (!u) return 'System Administrator';
    return u.role.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  });

  constructor(private readonly authService: AuthService) {}

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(v => !v);
  }

  signOut(): void {
    this.authService.logout();
  }
}
