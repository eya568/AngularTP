import { Component, Input ,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightStatusDirective } from '../../../../highlight-status';
import { PriorityColorPipe } from '../../../../priority-color-pipe';
import { trigger, transition, style, animate } from '@angular/animations';
import { StatusEmojiPipe } from '../../../../pipes/status-emoji.pipe-pipe';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule,
    HighlightStatusDirective, 
    PriorityColorPipe,
    StatusEmojiPipe],
  templateUrl: './task-list.component.html',
   animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class TaskListComponent {
selectedPriority: string = '';
  @Input() tasks: any[] = [];
@Output() statusChanged = new EventEmitter<void>();

changeStatus(task: any) {
  // exemple simple : toggle
  task.status = task.status === 'Terminé' ? 'En cours' : 'Terminé';

  this.statusChanged.emit();
}
 get filteredTasks() {
  if (!this.selectedPriority) {
    return this.tasks;
  }

  return this.tasks.filter(task =>
    task.priority === this.selectedPriority
  );
}
}

  







