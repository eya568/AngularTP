import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { emailExistsValidator } from '../../../../../validators/emailExistValidator';
import { UserService } from '../../services/userservice';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent {
  commentForm: FormGroup;
  submitted = signal(false);
  successMessage = signal<string | null>(null);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  constructor() {
    this.commentForm = this.fb.group({
      author: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        [emailExistsValidator(this.userService)]
      ],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get author() {
    return this.commentForm.get('author');
  }

  get email() {
    return this.commentForm.get('email');
  }

  get content() {
    return this.commentForm.get('content');
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.commentForm.valid) {
      console.log('Comment submitted:', this.commentForm.value);
      
      this.successMessage.set('Commentaire ajouté avec succès! ✅');
      
      // Reset form
      this.commentForm.reset();
      this.submitted.set(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        this.successMessage.set(null);
      }, 3000);
    }
  }

  resetForm(): void {
    this.commentForm.reset();
    this.submitted.set(false);
  }
}
