import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightStatusDirective } from '../../../../highlight-status';
import { PriorityColorPipe } from '../../../../priority-color-pipe';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, HighlightStatusDirective, PriorityColorPipe],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {

  @Input() tasks: any[] = [];

 
}

  







