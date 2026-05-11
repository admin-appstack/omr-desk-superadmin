import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatTableModule, MatMenuModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss'
})
export class UserManagement {
  displayedColumns = ['avatar', 'name', 'role', 'status', 'actions'];
  
  users = [
    { id: 'USR-001', name: 'Amit Kumar', email: 'amit@example.com', role: 'Super Admin', status: 'Active', avatar: 'AK' },
    { id: 'USR-002', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Admin', status: 'Active', avatar: 'RS' },
    { id: 'USR-003', name: 'Priya Singh', email: 'priya@example.com', role: 'Editor', status: 'Inactive', avatar: 'PS' },
    { id: 'USR-004', name: 'Vikram Patel', email: 'vikram@example.com', role: 'Viewer', status: 'Active', avatar: 'VP' },
  ];

  statCards = [
    { label: 'Total Users', value: '4', icon: 'people', theme: 'total' },
    { label: 'Active Users', value: '3', icon: 'check_circle', theme: 'custom' },
    { label: 'Admins', value: '2', icon: 'admin_panel_settings', theme: 'perms' },
  ];
}
