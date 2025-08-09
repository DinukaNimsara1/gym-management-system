import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  template: `
    <div class="centered">
      <mat-card>
        <h2>Login</h2>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" required />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" required />
          </mat-form-field>

          <button mat-flat-button color="primary" class="full" [disabled]="form.invalid">Login</button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .centered { display: grid; place-items: center; padding: 2rem; }
      mat-card { width: 100%; max-width: 420px; }
      .full { width: 100%; }
      h2 { margin: 0 0 1rem; }
    `,
  ],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.auth.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        if (res.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
    });
  }
}


