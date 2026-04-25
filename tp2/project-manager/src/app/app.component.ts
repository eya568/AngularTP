import { Component, OnInit } from '@angular/core';
import { ProjectListComponent } from './feautures/projects/components/project-list/project-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.css'],
  imports: [ProjectListComponent, CommonModule, RouterModule]
})
export class AppComponent  {
  title = 'Mes Projets';
  darkMode: boolean = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;
  }
}