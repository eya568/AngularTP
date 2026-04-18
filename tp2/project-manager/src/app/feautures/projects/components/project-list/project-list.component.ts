import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';    
import { TaskListComponent } from '../task-list/task-list.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component'; // ✅ AJOUT
import { FormsModule, NgModel } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,        
    ProjectDetailsComponent,
    FormsModule,
    DashboardComponent
    
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
      name: 'Projet 1',
      description: 'Description 1',
      createdAt: new Date(),
      status: 'En cours',
      tasks: [
        { title: 'Tâche 1', priority: 'Haute', status: 'En attente' },
        { title: 'Tâche 2', priority: 'Moyenne', status: 'En cours' }
      ]
    },
    {
      name: 'Projet 2',
      description: 'Description 2',
      createdAt: new Date(),
      status: 'Terminé',
      tasks: [
        { title: 'Tâche 1', priority: 'Basse', status: 'Terminé' }
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


