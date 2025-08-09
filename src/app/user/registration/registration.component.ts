import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';

export function heightValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const height = control.value;
    return height >= 100 && height <= 250 ? null : { invalidHeight: true };
  };
}

export function weightValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const weight = control.value;
    return weight >= 30 && weight <= 300 ? null : { invalidWeight: true };
  };
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  template: `
    <div class="centered">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
        <h2>Member Registration</h2>
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Address</mat-label>
          <input matInput formControlName="address" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Date of Birth</mat-label>
          <input matInput type="date" formControlName="date_of_birth" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Height (cm)</mat-label>
          <input matInput type="number" formControlName="height" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Weight (kg)</mat-label>
          <input matInput type="number" formControlName="weight" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Subscription Plan</mat-label>
          <mat-select formControlName="subscription_plan">
            <mat-option value="basic">Basic</mat-option>
            <mat-option value="standard">Standard</mat-option>
            <mat-option value="premium">Premium</mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-flat-button color="primary" [disabled]="form.invalid">Register</button>
      </form>
    </div>
  `,
  styles: [
    `
      .centered { display: grid; place-items: center; padding: 1rem; }
      .form { display: grid; gap: 0.75rem; width: 100%; max-width: 720px; }
      h2 { margin: 0 0 0.5rem; }
    `,
  ],
})
export class RegistrationComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    address: [''],
    date_of_birth: ['', Validators.required],
    height: [170, [Validators.required, heightValidator()]],
    weight: [70, [Validators.required, weightValidator()]],
    subscription_plan: ['basic', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.api.registerUser(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/login']),
    });
  }
}


