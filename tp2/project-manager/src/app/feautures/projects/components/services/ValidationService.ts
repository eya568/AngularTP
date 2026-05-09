import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  // =========================
  // 🔹 CHECK ERROR
  // =========================
  hasError(control: AbstractControl | null, errorType: string): boolean {
    return !!(control && control.touched && control.errors?.[errorType]);
  }

  // =========================
  // 🔹 CENTRAL ERROR MESSAGES
  // =========================
getErrorMessage(control: AbstractControl | null): string {

  if (!control) return '';

  const controlErrors = control.errors ?? {};
  const parentErrors = control.parent?.errors ?? {};

  const interacted = !!(control.touched || control.dirty);

  if (!interacted && !parentErrors['mustMatch']) return '';

  const errors = controlErrors;

  if (errors['required']) return 'Ce champ est requis';
  if (errors['email']) return 'Email invalide';
  if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} caractères`;
  if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} caractères`;
  if (errors['min']) return `Minimum: ${errors['min'].min}`;
  if (errors['max']) return `Maximum: ${errors['max'].max}`;
  if (errors['pattern']) return 'Format invalide';
  if (errors['passwordStrength']) {
    const s = errors['passwordStrength'];
    const parts: string[] = [];
    if (s.isValidLength === false) parts.push('Minimum 8 caractères');
    if (s.hasUpperCase === false) parts.push('Au moins une majuscule');
    if (s.hasLowerCase === false) parts.push('Au moins une minuscule');
    if (s.hasNumber === false) parts.push('Au moins un chiffre');
    if (s.hasSpecialChar === false) parts.push('Au moins un caractère spécial');
    if (parts.length) return parts.join(', ');
    return 'Mot de passe trop faible';
  }

  if (parentErrors['mustMatch']) return 'Les mots de passe ne correspondent pas';
  if (errors['emailExists']) return 'Cet email existe déjà';

  return '';
}
}
