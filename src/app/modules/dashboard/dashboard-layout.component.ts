import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';

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
    { icon: 'admin_panel_settings', label: 'Role Management', route: '/dashboard/roles', badge: null },
    { icon: 'settings',  label: 'Settings',           route: '/dashboard/settings', badge: null },
  ];

  get navItems() { return [...this.mainNav, ...this.managementNav]; }

  user = {
    name: 'Super Admin',
    role: 'System Administrator'
  };

  constructor(private readonly router: Router) { }

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(v => !v);
  }

  signOut(): void {
    console.log('Signing out...');
    this.router.navigate(['/login']);
  }
}
