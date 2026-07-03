import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { WebsiteSettingsDialog } from './website-settings-dialog/website-settings-dialog.component';

@Component({
  selector: 'app-institute-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatTooltipModule, MatDialogModule, MatMenuModule, MatDividerModule],
  templateUrl: './institute-management.html',
  styleUrl: './institute-management.scss',
})
export class InstituteManagement {
  displayedColumns = ['id', 'name', 'users', 'subscription', 'status', 'actions'];

  statCards = [
    { label: 'Total Institutes',     value: '124', icon: 'business',          theme: 'total',    tag: '+5 this month', tagClass: 'up' },
    { label: 'Active Subscriptions', value: '110', icon: 'assignment',      theme: 'active',   tag: '88% of total',   tagClass: 'info' },
    { label: 'Pending Approvals',    value: '8',   icon: 'hourglass_empty',  theme: 'pending',  tag: 'Needs action',   tagClass: 'warn' },
    { label: 'Total Revenue',        value: '₹8.4L',icon: 'payments',         theme: 'admin',    tag: 'This year',      tagClass: 'admin' },
  ];

  institutes = [
    { id: 'INST-1001', name: 'Apex Institute', email: 'contact@apex.com', avatar: 'AI', users: 1200, subscription: 'Premium', status: 'Active' },
    { id: 'INST-1002', name: 'Zenith Academy', email: 'info@zenith.com', avatar: 'ZA', users: 850, subscription: 'Basic', status: 'Active' },
    { id: 'INST-1003', name: 'Global School', email: 'admin@globalschool.com', avatar: 'GS', users: 0, subscription: 'None', status: 'Pending' },
    { id: 'INST-1004', name: 'Smart Prep', email: 'support@smartprep.com', avatar: 'SP', users: 450, subscription: 'Premium', status: 'Active' },
    { id: 'INST-1005', name: 'Elite Classes', email: 'elite@classes.com', avatar: 'EC', users: 0, subscription: 'Basic', status: 'Suspended' },
  ];

  dataSource = new MatTableDataSource(this.institutes);
  currentFilter = 'All';
  searchQuery = '';

  constructor(private dialog: MatDialog) {}

  openInstituteDialog(institute?: any) {
    console.log('Open dialog for', institute);
  }

  openWebsiteSettingsDialog(institute: any) {
    this.dialog.open(WebsiteSettingsDialog, {
      width: '500px',
      data: institute,
      disableClose: true
    });
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = filterValue;
    this.updateDataSource();
  }

  applyFilter(status: string) {
    this.currentFilter = status;
    this.updateDataSource();
  }

  updateDataSource() {
    let filtered = this.institutes;
    if (this.currentFilter !== 'All') {
      filtered = filtered.filter(inst => inst.status === this.currentFilter);
    }
    if (this.searchQuery) {
      filtered = filtered.filter(inst => 
        inst.name.toLowerCase().includes(this.searchQuery) ||
        inst.email.toLowerCase().includes(this.searchQuery) ||
        inst.subscription.toLowerCase().includes(this.searchQuery)
      );
    }
    this.dataSource.data = filtered;
  }
}
