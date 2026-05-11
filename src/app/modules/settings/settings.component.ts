import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  activeTab = 0;
  saved = false;

  tabs = [
    { label: 'Account Profile', sub: 'Name, email & photo',       icon: 'manage_accounts' },
    { label: 'Notifications',   sub: 'Alerts & auto-publish',      icon: 'notifications'   },
    { label: 'Security',        sub: 'Password & sessions',        icon: 'security'        },
    { label: 'Appearance',      sub: 'Theme & language',           icon: 'palette'         },
  ];

  profile = {
    name:      'Super Admin',
    email:     'superadmin@omrdesk.com',
    phone:     '+91 98765 43210',
    department: 'System Administration',
  };

  notifItems = [
    {
      label:   'Email Alerts',
      desc:    'Receive weekly system performance reports via email.',
      icon:    'email',
      bg:      '#eff6ff',
      color:   '#1d4ed8',
      enabled: true,
    },
    {
      label:   'SMS Alerts',
      desc:    'Notify system admins via SMS for critical alerts.',
      icon:    'sms',
      bg:      '#f0fdf4',
      color:   '#15803d',
      enabled: false,
    },
    {
      label:   'Auto-Publish Results',
      desc:    'Enable auto-publishing features for institutes by default.',
      icon:    'publish',
      bg:      '#fff7ed',
      color:   '#c2410c',
      enabled: true,
    },
    {
      label:   'Low Credit Warning',
      desc:    'Alert when an institute\'s scan credits fall below threshold.',
      icon:    'warning_amber',
      bg:      '#fefce8',
      color:   '#a16207',
      enabled: true,
    },
  ];

  sessions = [
    { device: 'Chrome on Windows 11', location: 'Mumbai, IN', time: 'Now',        icon: 'computer',  current: true  },
    { device: 'Safari on iPhone 15',  location: 'Pune, IN',   time: '2h ago',     icon: 'phone_iphone', current: false },
    { device: 'Firefox on Mac',       location: 'Delhi, IN',  time: 'Yesterday',  icon: 'laptop_mac',   current: false },
  ];

  themes = [
    { label: 'Light',  value: 'light',  preview: 'linear-gradient(135deg, #f8fafc, #e2e8f0)' },
    { label: 'Dark',   value: 'dark',   preview: 'linear-gradient(135deg, #1e293b, #0f172a)'  },
    { label: 'Purple', value: 'purple', preview: 'linear-gradient(135deg, #ede9fe, #7c3aed)'  },
  ];

  selectedTheme = 'light';
  language  = 'en';
  timezone  = 'IST';
}
