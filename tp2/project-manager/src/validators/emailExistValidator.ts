import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../app/feautures/projects/components/services/userservice';

export function emailExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {

    if (!control.value) {
      return of(null); // ✅ FIX HERE
    }

    return userService.checkEmailExists(control.value).pipe(
      map(exists => {
        return exists ? { emailExists: true } : null;
      })
    );
  };
}
