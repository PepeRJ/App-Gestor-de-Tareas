import { Component, OnInit, inject, ViewChild, signal, effect } from '@angular/core';

import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { TasksService } from '../../servicios/tasks.service';
import { Task } from '../../interfaces/task';
import { FechaPipe } from '../../pipes/fecha.pipe';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import {MatPaginatorModule, PageEvent, MatPaginator} from '@angular/material/paginator';



@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [MatListModule, MatFormFieldModule, MatIconModule, MatGridListModule, FormsModule, CommonModule, MatSelect, MatOption, FechaPipe, MatButton, ModalConfirmComponent, MatPaginatorModule],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss',

})
export class ListTasksComponent  {

  taskService = inject(TasksService);
  dialog = inject(MatDialog);

  tasks = signal<Task[]>([]);
  paginatedTasks = signal<Task[]>([]);
  pageSize = 4;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Efecto para actualizar las tareas
    effect(() => {
      this.tasks.set(this.taskService.getTasks());
      this.paginateTasks();
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.paginateTasks();
  }

  paginateTasks(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks.set(this.tasks().slice(startIndex, endIndex));
  }

  eliminarTarea(tarea: Task): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(tarea);
        this.adjustPaginator();
        this.paginateTasks();
      }
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateTasks();
  }

  private adjustPaginator(): void {
    if ((this.pageIndex * this.pageSize) >= this.tasks().length) {
      this.pageIndex = this.paginator.pageIndex = Math.max(0, Math.ceil(this.tasks().length / this.pageSize) - 1);
    }
  }
}