import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { FilterTaskComponent } from './components/filter-task/filter-task.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddTaskComponent, ListTasksComponent, FilterTaskComponent, ModalConfirmComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'listTasks';
}
