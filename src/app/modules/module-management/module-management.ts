import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-module-management',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule, MatMenuModule, MatDividerModule],
  templateUrl: './module-management.html',
  styleUrl: './module-management.scss',
})
export class ModuleManagement {
  displayedColumns = ['icon', 'name', 'free', 'pro', 'premium', 'platinum', 'status', 'actions'];

  statCards = [
    { label: 'Total Modules',     value: '5',      icon: 'view_module', theme: 'total',   tag: 'All Modules', tagClass: 'info' },
    { label: 'Pro Features',       value: '4',      icon: 'workspace_premium', theme: 'perms', tag: 'Subscription required', tagClass: 'warn' },
    { label: 'Active Modules',    value: '5',      icon: 'check_circle', theme: 'custom',  tag: 'All active', tagClass: 'up' },
    { label: 'Total Tiers',       value: '4',      icon: 'layers',       theme: 'warning', tag: 'Free to Platinum', tagClass: 'info' },
  ];

  modules = [
    { 
      id: 'MOD-001', 
      name: 'OMR Scanning', 
      description: 'Core module for scanning and processing OMR sheets.', 
      status: 'Active', 
      icon: 'qr_code_scanner',
      limits: { free: '20 OMRs', pro: '500 OMRs', premium: '1,000 OMRs', platinum: '10,000 OMRs' }
    },
    { 
      id: 'MOD-002', 
      name: 'Question Bank', 
      description: 'Manage and organize question papers and banks.', 
      status: 'Active', 
      icon: 'quiz',
      limits: { free: '5 Papers', pro: '50 Papers', premium: '200 Papers', platinum: 'Unlimited' }
    },
    { 
      id: 'MOD-003', 
      name: 'Student Management', 
      description: 'Manage student records and data.', 
      status: 'Active', 
      icon: 'people',
      limits: { free: '50 Students', pro: '500 Students', premium: '2,000 Students', platinum: 'Unlimited' }
    },
    { 
      id: 'MOD-004', 
      name: 'Result Analytics', 
      description: 'Detailed analytics and reports for results.', 
      status: 'Active', 
      icon: 'analytics',
      limits: { free: 'Basic View', pro: 'Advanced', premium: 'Advanced + Export', platinum: 'Full Access' }
    },
    { 
      id: 'MOD-005', 
      name: 'Institute Website', 
      description: 'Build and manage custom website for institute.', 
      status: 'Active', 
      icon: 'web',
      limits: { free: 'Not Available', pro: '1 Template', premium: '3 Templates', platinum: 'Unlimited' }
    },
  ];

  dataSource = new MatTableDataSource(this.modules);
  searchQuery = '';

  constructor() {}

  toggleStatus(module: any) {
    module.status = module.status === 'Active' ? 'Inactive' : 'Active';
    this.dataSource.data = [...this.modules];
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = filterValue;
    this.updateDataSource();
  }

  updateDataSource() {
    let filtered = this.modules;
    if (this.searchQuery) {
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(this.searchQuery) ||
        m.description.toLowerCase().includes(this.searchQuery)
      );
    }
    this.dataSource.data = filtered;
  }
}
