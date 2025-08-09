import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `<div class="spinner"></div>`,
  styles: [
    `
      .spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(0,0,0,0.1);
        border-top-color: var(--mat-sys-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `,
  ],
})
export class SpinnerComponent {}


