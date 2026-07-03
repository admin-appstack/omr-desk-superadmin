import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './modules/dashboard/dashboard-layout.component';
import { DashboardHomeComponent } from './modules/dashboard/dashboard-home.component';
import { InstituteManagement } from './modules/institute-management/institute-management';
import { RoleManagement } from './modules/role-management/role-management';
import { SettingsComponent } from './modules/settings/settings.component';
import { ModuleManagement } from './modules/module-management/module-management';
import { UserManagement } from './modules/user-management/user-management';
import { SubscriptionManagement } from './modules/subscription-management/subscription-management';
import { LoginComponent } from './modules/auth/login/login.component';
import { UnauthorizedComponent } from './modules/auth/unauthorized/unauthorized.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ─── Public ──────────────────────────────────────────────────────────────
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  // ─── Protected Dashboard ─────────────────────────────────────────────────
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHomeComponent },
      { path: 'institutes', component: InstituteManagement },
      { path: 'roles', component: RoleManagement },
      { path: 'users', component: UserManagement },
      { path: 'settings', component: SettingsComponent },
      { path: 'modules', component: ModuleManagement },
      { path: 'subscriptions', component: SubscriptionManagement },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
