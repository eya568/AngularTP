import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';    
import { FormsModule, NgModel } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,        
    FormsModule,
    DashboardComponent,
    RouterLink
  ],
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent {
  selectedProject: any = null;
  searchTerm: string = ''; 
  message: string = '';
  showMessage(msg: string) {
  this.message = msg;

  setTimeout(() => {
    this.message = '';
  }, 3000);
}
  projects = [
  {
    id: 1,
    name: 'Projet 1',
    description: 'Description 1',
    createdAt: new Date(),
    status: 'En cours',
    tasks: [
      {
        id: 1,
        title: 'Tâche 1',
        priority: 'Haute',
        status: 'En attente'
      },
      {
        id: 2,
        title: 'Tâche 2',
        priority: 'Moyenne',
        status: 'En cours'
      }
    ]
  },

  {
    id: 2,
    name: 'Projet 2',
    description: 'Description 2',
    createdAt: new Date(),
    status: 'Terminé',
    tasks: [
      {
        id: 1,
        title: 'Tâche 1',
        priority: 'Basse',
        status: 'Terminé'
      }
    ]
  }
];
  selectProject(project : any){
    this.selectedProject = project;
  }
  get filteredProjects() {
  return this.projects.filter(project =>
    project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  
  
}
deleteProject(project: any) {
  this.projects = this.projects.filter(p => p !== project);

  // Si le projet supprimé est sélectionné → reset
  if (this.selectedProject === project) {
    this.selectedProject = null;
  }

  this.showMessage("Projet supprimé avec succès ✅");
}

}


