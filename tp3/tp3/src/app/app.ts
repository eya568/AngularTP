import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeComponent } from './employe/employe.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp3');
  person : string = 'asma';
  age : number =23;
  address : any = {street: 'rue de Farhat Hached',city :'ariana'};
  
}
