import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleClass: string;
  roleIcon: string;
  status: string;
  avatar: string;
  avatarTheme: string;
  lastActive: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss'
})
export class UserManagement {
  displayedColumns = ['id', 'user', 'role', 'lastActive', 'status', 'actions'];
  currentFilter = 'All';

  private allUsers: User[] = [
    {
      id: 'USR-001', name: 'Amit Kumar',   email: 'amit@example.com',
      role: 'Super Admin', roleClass: 'super-admin', roleIcon: 'shield',
      status: 'Active',   avatar: 'AK', avatarTheme: 'violet', lastActive: '2 mins ago'
    },
    {
      id: 'USR-002', name: 'Rahul Sharma', email: 'rahul@example.com',
      role: 'Admin',       roleClass: 'admin',       roleIcon: 'manage_accounts',
      status: 'Active',   avatar: 'RS', avatarTheme: 'blue',   lastActive: '1 hour ago'
    },
    {
      id: 'USR-003', name: 'Priya Singh',  email: 'priya@example.com',
      role: 'Editor',      roleClass: 'editor',      roleIcon: 'edit_note',
      status: 'Inactive', avatar: 'PS', avatarTheme: 'rose',   lastActive: '3 days ago'
    },
    {
      id: 'USR-004', name: 'Vikram Patel', email: 'vikram@example.com',
      role: 'Viewer',      roleClass: 'viewer',      roleIcon: 'visibility',
      status: 'Active',   avatar: 'VP', avatarTheme: 'teal',   lastActive: '5 hrs ago'
    },
    {
      id: 'USR-005', name: 'Sneha Rao',    email: 'sneha@example.com',
      role: 'Editor',      roleClass: 'editor',      roleIcon: 'edit_note',
      status: 'Active',   avatar: 'SR', avatarTheme: 'amber',  lastActive: '30 mins ago'
    },
  ];

  dataSource = new MatTableDataSource<User>(this.allUsers);

  statCards = [
    { label: 'Total Users',  value: '5', icon: 'people',               theme: 'total',  tag: 'All Roles',     tagClass: 'info'  },
    { label: 'Active Users', value: '4', icon: 'check_circle',          theme: 'custom', tag: '↑ 1 this week', tagClass: 'up'    },
    { label: 'Admins',       value: '2', icon: 'admin_panel_settings',  theme: 'perms',  tag: 'Super + Admin', tagClass: 'admin' },
  ];

  applySearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.data = this.allUsers.filter(u =>
      this.matchesFilter(u) &&
      (u.name.toLowerCase().includes(query) ||
       u.email.toLowerCase().includes(query) ||
       u.role.toLowerCase().includes(query) ||
       u.id.toLowerCase().includes(query))
    );
  }

  applyFilter(filter: string): void {
    this.currentFilter = filter;
    this.dataSource.data = filter === 'All'
      ? [...this.allUsers]
      : this.allUsers.filter(u => u.status === filter);
  }

  private matchesFilter(u: User): boolean {
    return this.currentFilter === 'All' || u.status === this.currentFilter;
  }
}
