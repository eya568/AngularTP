import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

  private existingEmails: string[] = [
   
  ];

  private users = [
    { id: 1, email: 'admin@test.com', role: 'Admin' },
    { id: 2, email: 'user@test.com', role: 'User' },
    { id: 3, email: 'alice@test.com', role: 'User' },
    { id: 4, email: 'bob@test.com', role: 'User' }
  ];

  checkEmailExists(email: string) {
    const exists = this.existingEmails.includes(email);
    return of(exists).pipe(delay(1000)); // simulate server delay
  }

  addEmail(email: string) {
    this.existingEmails.push(email);
    console.log('📦 Emails stored:', this.existingEmails);
  }

  getUsers() {
    return of(this.users).pipe(delay(300));
  }
}
