import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = signal(false);
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit(): Promise<void> {
    this.submitted.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.loginForm.invalid) {
      this.errorMessage.set('Veuillez remplir tous les champs correctement');
      return;
    }

    this.loading.set(true);

    try {
      const { email, password } = this.loginForm.value;
      const success = await this.authService.login(email, password);

      if (success) {
        this.successMessage.set('Connexion réussie! Redirection...');
        this.loginForm.reset();
        this.submitted.set(false);

        // Redirect after short delay
        setTimeout(() => {
          const user = this.authService.getCurrentUser();
          if (user?.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/projects']);
          }
        }, 1500);
      }
    } catch (error) {
      this.errorMessage.set('Erreur lors de la connexion');
    } finally {
      this.loading.set(false);
    }
  }

  resetForm(): void {
    this.loginForm.reset();
    this.submitted.set(false);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}
