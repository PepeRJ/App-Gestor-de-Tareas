import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [    MatDialogModule, MatButtonModule,],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss'
})
export class ModalConfirmComponent {

  private dialogRef = inject(MatDialogRef<ModalConfirmComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}

