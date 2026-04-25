import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

  private existingEmails: string[] = [
   
  ];

  checkEmailExists(email: string) {
    const exists = this.existingEmails.includes(email);
    return of(exists).pipe(delay(1000)); // simulate server delay
  }

  addEmail(email: string) {
    this.existingEmails.push(email);
    console.log('📦 Emails stored:', this.existingEmails);
  }
}
