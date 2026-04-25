import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { passwordStrengthValidator, matchPasswordValidator } from '../../../../../validators/custom-validators';
import { UserService } from '../services/userservice';
import { emailExistsValidator } from '../../../../../validators/emailExistValidator';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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

      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],

      telephone: ['', [Validators.pattern(/^0[1-9][0-9]{8}$/)]],

      message: ['', [Validators.required, Validators.minLength(10)]],

      // 🏠 FORMARRAY ADRESSES (NEW ADDITION ONLY)
      adresses: this.fb.array([
        this.createAddressGroup()
      ]),

      // 🔐 PASSWORD
      password: ['', [Validators.required, passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required]

    }, {
      validators: matchPasswordValidator('password', 'confirmPassword')
    });
  }

  // =========================
  // 🏠 ADDRESS GROUP (NEW ONLY)
  // =========================
  createAddressGroup(): FormGroup {
    return this.fb.group({
      type: ['domicile', Validators.required],
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required]
    });
  }

  // =========================
  // 🏠 GET FORMARRAY
  // =========================
  get adresses(): FormArray {
    return this.contactForm.get('adresses') as FormArray;
  }

  // =========================
  // 🏠 ADD / REMOVE
  // =========================
  addAddress() {
    this.adresses.push(this.createAddressGroup());
  }

  removeAddress(index: number) {
    if (this.adresses.length > 1) {
      this.adresses.removeAt(index);
    }
  }

  // =========================
  // 🔹 OLD GETTERS (UNCHANGED)
  // =========================
  get nom() { return this.contactForm.get('nom'); }
  get prenom() { return this.contactForm.get('prenom'); }
  get email() { return this.contactForm.get('email'); }
  get age() { return this.contactForm.get('age'); }
  get telephone() { return this.contactForm.get('telephone'); }
  get message() { return this.contactForm.get('message'); }
  get password() { return this.contactForm.get('password'); }
  get confirmPassword() { return this.contactForm.get('confirmPassword'); }

  // ⚠️ KEEP THIS (FIXED TYPE SAFE)
  get passwordStrengthErrors() {
    return this.password?.errors?.['passwordStrength'];
  }

  get adresse() {
    return this.contactForm.get('adresse') as FormGroup | null;
  }

  // =========================
  // 🔹 UTILITIES (UNCHANGED)
  // =========================
  markFormGroupTouched() {
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        Object.values(control.controls).forEach(c => c.markAsTouched());
      }
    });
  }

  resetForm() {
    this.contactForm.reset();
  }

  // =========================
  // 🔹 SUBMIT (UPDATED ONLY FOR FORMARRAY VALIDATION)
  // =========================
  onSubmit() {

    if (this.contactForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // ensure at least one address exists
    if (this.adresses.length === 0) {
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
