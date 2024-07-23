import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
  standalone: true
})
export class FechaPipe implements PipeTransform {

  transform(date: Date | string | null): string {
    if (!date) {
      return 'Fecha no especificada';
    }

    const dateObj = typeof date === 'string' ? new Date(date) : date as Date;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ajustar a la medianoche
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const timeDiff = Math.abs(dateObj.getTime() - today.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays === 0) {
      return 'Acabarlo para hoy';
    } else if (diffDays === 1) {
      return 'Acabarlo para mañana';
    } else if (diffDays <= 7) {
      return `Quedan ${diffDays} día${diffDays === 1 ? '' : 's'}`;
    } else {
      return dateObj.toLocaleDateString('es-ES');
    }
  }
}