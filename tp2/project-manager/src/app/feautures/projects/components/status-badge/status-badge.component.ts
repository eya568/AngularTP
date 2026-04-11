import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="getClasses()"
          class="px-3 py-1 rounded-full text-sm font-semibold">
      {{ status }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  getClasses() {
    return {
      'bg-green-100 text-green-700': this.status === 'Terminé',
      'bg-yellow-100 text-yellow-700': this.status === 'En cours',
      'bg-gray-100 text-gray-700': this.status === 'En attente'
    };
  }
}