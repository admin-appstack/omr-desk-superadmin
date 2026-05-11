import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './modules/dashboard/dashboard-layout.component';
import { DashboardHomeComponent } from './modules/dashboard/dashboard-home.component';
import { InstituteManagement } from './modules/institute-management/institute-management';
import { RoleManagement } from './modules/role-management/role-management';
import { SettingsComponent } from './modules/settings/settings.component';
import { ModuleManagement } from './modules/module-management/module-management';
import { UserManagement } from './modules/user-management/user-management';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHomeComponent },
      { path: 'institutes', component: InstituteManagement },
      { path: 'roles', component: RoleManagement },
      { path: 'users', component: UserManagement },
      { path: 'settings', component: SettingsComponent },
      { path: 'modules', component: ModuleManagement },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
