import { Component, OnInit } from '@angular/core';
import { ProjectListComponent } from './feautures/projects/components/project-list/project-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.css'],
  imports: [ProjectListComponent]
})
export class AppComponent implements OnInit {
  title = 'Mes Projets';
  isDarkMode = false;

  ngOnInit() {
    // Load saved preference from localStorage
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    this.updateDarkMode();
  }

  private updateDarkMode() {
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}