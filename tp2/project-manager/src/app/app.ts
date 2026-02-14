import { Component, signal } from '@angular/core';
import {ProjectListComponent} from "./feautures/projects/components/project-list/project-list.component";
@Component({
  selector: 'app-root',
  imports: [ProjectListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('project-manager');
}
