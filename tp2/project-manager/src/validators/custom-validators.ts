import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


// ✅ 1. Password Strength Validator
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) return null; 

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

    if (valid) {
      return null;
    }

    return {
      passwordStrength: {
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        isValidLength
      }
    };
  };
}


export function matchPasswordValidator(password: string, confirmPassword: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {

    const pass = group.get(password)?.value;
    const confirm = group.get(confirmPassword)?.value;

    if (pass === confirm) {
      return null;
    }

    return { mustMatch: true };
  };
}