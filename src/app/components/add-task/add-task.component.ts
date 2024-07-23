import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { TasksService } from '../../servicios/tasks.service';
import { Task } from '../../interfaces/task';
import {  NgIf } from '@angular/common';






@Component({
  selector: 'app-add-task',
  standalone: true,
  providers: [provideNativeDateAdapter(),],
  imports: [MatInputModule, MatIconModule, FormsModule, MatFormFieldModule, MatButtonModule, MatDatepickerModule, MatSelectModule, NgIf,],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  taskService = inject(TasksService);

  // VARIABLES DE LA INTERFAZ TASK
  descripcion: string = '';
  estado: string = 'Por empezar';
  fecha: Date | null = null;
  //VARIABLE PARA SABER LA FECHA ACTUAL A LA HORA DE ELEGIR FECHA
  currentDate: Date = new Date(); 


  addTask(): void {
    if (this.descripcion && this.fecha) {
      const newTask: Task = {
        descripcion: this.descripcion,
        estado: this.estado,
        fecha: this.fecha // Formato YYYY-MM-DD para simplificar
      };
      this.taskService.addTask(newTask);
      this.resetForm();
    }
  }

  

  resetForm(): void {
    this.descripcion = '';
    this.estado = 'Por empezar';
    this.fecha = null;
  }
}
 

  
// FORMULARIOS REACTIVOS, SOLO FALTARIA MODIFICAR EL HTML 
// import {Component, OnInit, inject, } from '@angular/core';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
// import {FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {provideNativeDateAdapter} from '@angular/material/core';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatSelectModule} from '@angular/material/select';
// import { TasksService } from '../../servicios/tasks.service';
// import { Task } from '../../interfaces/task';
// import {  NgIf } from '@angular/common';







// @Component({
//   selector: 'app-add-task',
//   standalone: true,
//   providers: [provideNativeDateAdapter(),],
//   imports: [MatInputModule, MatIconModule, FormsModule, MatFormFieldModule, MatButtonModule, MatDatepickerModule, MatSelectModule, NgIf, ReactiveFormsModule] ,
//   templateUrl: './add-task.component.html',
//   styleUrl: './add-task.component.scss'
// })
// export class AddTaskComponent implements OnInit {

//   taskService = inject(TasksService);
//   fb = inject(FormBuilder)

//   addTaskForm!: FormGroup;
//   // VARIABLES DE LA INTERFAZ TASK
//   descripcion: string = '';
//   estado: string = 'Por empezar';
//   fecha: Date | null = null;
//   //VARIABLE PARA SABER LA FECHA ACTUAL A LA HORA DE ELEGIR FECHA
//   currentDate: Date = new Date(); 


//   ngOnInit(): void {
//     this.addTaskForm= this.fb.group({
//    descripcion: ['', Validators.required],
//    estado: ['Por empezar'],
//     fecha: [null, Validators.required],
//    });
//     }
   
//     onSubmit(): void {
//     const newTask : Task = {
//     ...this.addTaskForm.value,
//    fecha: this.addTaskForm.value.fecha.toISOString().split('T')[0],// Formato YYYY-MM-DD
//     };
//     this.taskService.addTask(newTask);
//    this.addTaskForm.reset();
//    }
//    }




