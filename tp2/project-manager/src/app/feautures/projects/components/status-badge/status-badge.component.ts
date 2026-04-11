import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [ngClass]="getStatusClasses()"
      class="px-3 py-1 text-sm rounded-full font-medium transition-colors duration-200">
      {{ status }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input() status: string = '';
  
  getStatusClasses(): string {
    const statusMap: Record<string, string> = {
      'En cours': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      'Terminé': 'bg-green-100 text-green-700 border border-green-200',
      'En attente': 'bg-red-100 text-red-700 border border-red-200',
      'Planifié': 'bg-blue-100 text-blue-700 border border-blue-200'
    };
    
    return statusMap[this.status] || 'bg-gray-100 text-gray-700 border border-gray-200';
  }
}