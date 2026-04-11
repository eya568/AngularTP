import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employe',
  imports: [CommonModule],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css',
})
export class EmployeComponent {
  agenda = [
    {date: new Date(), message: 'tacheA'},
    {date: new Date(), message : 'tacheB'}
  ];
  info_employe = {
    nom : 'Tamim',
    prenom : 'Salah',
    telephone: '01234'
  }
}
