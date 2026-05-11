import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-module-stats',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './module-stats.html',
  styleUrl: './module-stats.scss'
})
export class ModuleStatsComponent {
  @Input() stats: any[] = [];
}
