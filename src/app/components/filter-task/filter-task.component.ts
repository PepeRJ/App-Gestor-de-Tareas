import { Component, inject } from '@angular/core';
import { MatButtonToggleModule, MatButtonToggleChange } from '@angular/material/button-toggle';
import { TasksService } from '../../servicios/tasks.service';

@Component({
  selector: 'app-filter-task',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './filter-task.component.html',
  styleUrl: './filter-task.component.scss'
})
export class FilterTaskComponent {

  private taskService = inject(TasksService)

  orderTasksByState(estado: string): void {
    this.taskService.orderTasksByState(estado);
  }

  orderTasksByDate(order: 'asc' | 'desc'): void {
    this.taskService.orderTasksByDate(order);
  }
}
