import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {

  user = {
    name: 'Super Admin',
    role: 'System Administrator'
  };

  activeInstitutes = [
    { name: 'Apex Institute', progress: 100, color: 'primary' },
    { name: 'Zenith Academy', progress: 40, color: 'accent' },
  ];

  recentActivity = [
    { text: 'New Institute Registered: Apex Institute', time: '2 mins ago', color: '#133e87' },
    { text: 'Superadmin "John Doe" added', time: '18 mins ago', color: '#e85b24' },
    { text: 'Global Settings updated', time: '1 hour ago', color: '#059669' },
    { text: 'System backup completed', time: '3 hours ago', color: '#7c3aed' },
    { text: 'Payment gateway verified for Zenith Academy', time: 'Yesterday', color: '#0ea5e9' },
  ];
}
