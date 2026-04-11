import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyDate',
  standalone: true
})
export class FriendlyDatePipe implements PipeTransform {

  transform(value: string | Date | null | undefined): string {
    if (!value) return '';

    const today = new Date();
    const date = new Date(value);

    if (isNaN(date.getTime())) return '';

    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd’hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    return date.toLocaleDateString();
  }
}