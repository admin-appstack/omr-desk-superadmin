import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { SubscriptionDrawerComponent } from './components/subscription-drawer/subscription-drawer';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  billing: string;
  status: string;
  limit: string;
  features: string[];
}

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    SubscriptionDrawerComponent
  ],
  templateUrl: './subscription-management.html',
  styleUrl: './subscription-management.scss'
})
export class SubscriptionManagement {
  isDrawerOpen = false;
  selectedPlan: any = {};
  currentFilter = 'All';
  searchQuery = '';

  private allPlans: SubscriptionPlan[] = [
    {
      id: 'PLAN-001',
      name: 'Free',
      price: '$0',
      billing: 'N/A',
      status: 'Active',
      limit: '20 req/mo',
      features: ['Basic Reports', '1 User']
    },
    {
      id: 'PLAN-002',
      name: 'Pro',
      price: '$49',
      billing: 'Monthly',
      status: 'Active',
      limit: '500 req/mo',
      features: ['Advanced Reports', '5 Users', 'Email Support']
    },
    {
      id: 'PLAN-003',
      name: 'Premium',
      price: '$99',
      billing: 'Monthly',
      status: 'Active',
      limit: '1000 req/mo',
      features: ['All Reports', 'Unlimited Users', 'Priority Support']
    },
    {
      id: 'PLAN-004',
      name: 'Platinum',
      price: '$999',
      billing: 'Annually',
      status: 'Active',
      limit: '10000 req/mo',
      features: ['Custom Solutions', 'Dedicated Account Manager']
    }
  ];

  dataSource = new MatTableDataSource<SubscriptionPlan>(this.allPlans);
  displayedColumns: string[] = ['id', 'name', 'price', 'limit', 'status', 'features', 'actions'];

  getPlanClass(plan: string): string {
    return plan.toLowerCase() + '-plan';
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }

  openDrawer(plan: any = {}) {
    this.selectedPlan = { ...plan };
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    this.selectedPlan = {};
  }

  savePlan(plan: any) {
    console.log('Save plan', plan);
    // Mock save
    if (plan.id) {
      const index = this.allPlans.findIndex(p => p.id === plan.id);
      if (index !== -1) {
        this.allPlans[index] = { ...plan };
      }
    } else {
      plan.id = 'PLAN-' + Math.floor(1000 + Math.random() * 9000);
      this.allPlans.push(plan);
    }
    this.updateDataSource();
    this.closeDrawer();
  }

  deletePlan(id: string) {
    this.allPlans = this.allPlans.filter(p => p.id !== id);
    this.updateDataSource();
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = filterValue;
    this.updateDataSource();
  }

  updateDataSource() {
    let filtered = this.allPlans;
    if (this.currentFilter !== 'All') {
      filtered = filtered.filter(plan => plan.status === this.currentFilter);
    }
    if (this.searchQuery) {
      filtered = filtered.filter(plan => 
        plan.name.toLowerCase().includes(this.searchQuery) ||
        plan.id.toLowerCase().includes(this.searchQuery)
      );
    }
    this.dataSource.data = filtered;
  }
}
