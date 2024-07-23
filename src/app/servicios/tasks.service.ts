import { Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  private tasks = signal<Task[]>(this.loadTasks());

  getTasks(): Task[] {
    return this.tasks();
  }

  addTask(newTask: Task): void {
    this.tasks.update(tasks => {
      const updatedTasks = [...tasks, newTask];
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  deleteTask(task: Task): void {
    this.tasks.update(tasks => {
      const updatedTasks = tasks.filter(t => t.descripcion !== task.descripcion);
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  updateTask(task: Task, updatedTask: Task): void {
    this.tasks.update(tasks => {
      const updatedTasks = tasks.map(t => t.descripcion === task.descripcion ? updatedTask : t);
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  orderTasksByState(estado: string): void {
    const order: { [estado: string]: number } = {
      'Por empezar': 1,
      'En proceso': 2,
      'Terminada': 3
    };

    this.tasks.update(tasks => {
      const updatedTasks = [...tasks].sort((a, b) => order[a.estado] - order[b.estado]);
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  orderTasksByDate(order: 'asc' | 'desc'): void {
    this.tasks.update(tasks => {
      const updatedTasks = [...tasks].sort((a, b) => {
        const dateA = a.fecha ? new Date(a.fecha).getTime() : 0; 
        const dateB = b.fecha ? new Date(b.fecha).getTime() : 0; 
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
      this.saveTasks(updatedTasks);
      return updatedTasks;
    });
  }


  private loadTasks(): Task[] {
    if (this.isLocalStorageAvailable()) {
      const tasksJson = localStorage.getItem('tasks');
      return tasksJson ? JSON.parse(tasksJson) : [];
    }
    return [];
  }

  private saveTasks(tasks: Task[]): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}