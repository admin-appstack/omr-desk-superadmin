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
import { animate, style, transition, trigger } from '@angular/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModuleDrawerComponent } from './components/module-drawer/module-drawer';
import { ModuleStatsComponent } from './components/module-stats/module-stats';

@Component({
  selector: 'app-module-management',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule, MatMenuModule, MatDividerModule, MatSlideToggleModule, ModuleDrawerComponent, ModuleStatsComponent],
  templateUrl: './module-management.html',
  styleUrl: './module-management.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class ModuleManagement {
  displayedColumns = ['icon', 'name', 'status', 'actions'];
  
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
      unit: 'OMRs/mo',
      limits: [
        { plan: 'Free', limit: '20 OMRs' },
        { plan: 'Pro', limit: '500 OMRs' },
        { plan: 'Premium', limit: '1,000 OMRs' },
        { plan: 'Platinum', limit: '10,000 OMRs' }
      ]
    },
    { 
      id: 'MOD-002', 
      name: 'Question Bank', 
      description: 'Manage and organize question papers and banks.', 
      status: 'Active', 
      icon: 'quiz',
      unit: 'papers/mo',
      limits: [
        { plan: 'Free', limit: '5 Papers' },
        { plan: 'Pro', limit: '50 Papers' },
        { plan: 'Premium', limit: '200 Papers' },
        { plan: 'Platinum', limit: 'Unlimited' }
      ]
    },
    { 
      id: 'MOD-003', 
      name: 'Student Management', 
      description: 'Manage student records and data.', 
      status: 'Active', 
      icon: 'people',
      unit: 'students',
      limits: [
        { plan: 'Free', limit: '50 Students' },
        { plan: 'Pro', limit: '500 Students' },
        { plan: 'Premium', limit: '2,000 Students' },
        { plan: 'Platinum', limit: 'Unlimited' }
      ]
    },
    { 
      id: 'MOD-004', 
      name: 'Result Analytics', 
      description: 'Detailed analytics and reports for results.', 
      status: 'Active', 
      icon: 'analytics',
      unit: 'reports',
      limits: [
        { plan: 'Free', limit: 'Basic View' },
        { plan: 'Pro', limit: 'Advanced' },
        { plan: 'Premium', limit: 'Advanced + Export' },
        { plan: 'Platinum', limit: 'Full Access' }
      ]
    },
    { 
      id: 'MOD-005', 
      name: 'Institute Website', 
      description: 'Build and manage custom website for institute.', 
      status: 'Active', 
      icon: 'web',
      limits: [
        { plan: 'Free', limit: 'Not Available' },
        { plan: 'Pro', limit: '1 Template' },
        { plan: 'Premium', limit: '3 Templates' },
        { plan: 'Platinum', limit: 'Unlimited' }
      ]
    },
  ];

  dataSource = new MatTableDataSource(this.modules);
  selectedModule: any | null = null;
  isDrawerOpen = false;
  searchQuery = '';

  constructor() {}

  toggleStatus(module: any) {
    module.status = module.status === 'Active' ? 'Inactive' : 'Active';
    this.dataSource.data = [...this.modules];
  }

  openDrawer(module: any) {
    this.selectedModule = JSON.parse(JSON.stringify(module)); // Deep copy for editing
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    this.selectedModule = null;
  }

  saveLimits(updatedModule?: any) {
    const target = updatedModule || this.selectedModule;
    if (target) {
      const index = this.modules.findIndex(m => m.id === target.id);
      if (index !== -1) {
        this.modules[index].limits = target.limits;
        this.dataSource.data = [...this.modules];
      }
    }
    this.closeDrawer();
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
