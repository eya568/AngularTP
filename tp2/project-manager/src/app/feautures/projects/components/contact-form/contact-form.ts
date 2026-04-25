import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordStrengthValidator, matchPasswordValidator } from '../../../../../validators/custom-validators';
import { UserService } from '../services/userservice';
import { emailExistsValidator } from '../../../../../validators/emailExistValidator';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {

  contactForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.contactForm = this.fb.group({

      // 👤 PERSONAL INFO
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],

      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [emailExistsValidator(this.userService)],
          updateOn: 'blur'
        }
      ],
 adresse: this.fb.group({
      rue: ['', Validators.required],
      codePostal: ['', [Validators.required]],
      ville: ['', Validators.required],
      pays: ['', Validators.required]
    }),
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],


      telephone: ['', [Validators.pattern(/^0[1-9][0-9]{8}$/)]],

      message: ['', [Validators.required, Validators.minLength(10)]],

      // 🔐 PASSWORD
      password: ['', [Validators.required, passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required]

    }, {
      validators: matchPasswordValidator('password', 'confirmPassword')
    });
    console.log(this.contactForm.valid);
console.log(this.contactForm.status);

  }

  // =========================
  // 🔹 GETTERS
  // =========================
  get nom() { return this.contactForm.get('nom'); }
  get prenom() { return this.contactForm.get('prenom'); }
  get email() { return this.contactForm.get('email'); }
  get age() { return this.contactForm.get('age'); }
  get telephone() { return this.contactForm.get('telephone'); }
  get message() { return this.contactForm.get('message'); }
  get password() { return this.contactForm.get('password'); }
  get confirmPassword() { return this.contactForm.get('confirmPassword'); }
get adresse() { return this.contactForm.get('adresse') as FormGroup; }
  get passwordStrengthErrors() {
    return this.password?.errors?.['passwordStrength'];
  }

  // =========================
  // 🔹 UTILITIES (FIXED)
  // =========================
  markFormGroupTouched() {
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();

      // handle nested groups safely
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(c => c.markAsTouched());
      }
    });
  }

  resetForm() {
    this.contactForm.reset();
  }

  // =========================
  // 🔹 SUBMIT
  // =========================
  onSubmit() {

    if (this.contactForm.invalid || this.contactForm.pending) {
      this.markFormGroupTouched();
      return;
    }

    const email = this.contactForm.value.email;

    if (email) {
      this.userService.addEmail(email);
    }

    console.log('Form submitted:', this.contactForm.value);

    this.resetForm();
  }
}
