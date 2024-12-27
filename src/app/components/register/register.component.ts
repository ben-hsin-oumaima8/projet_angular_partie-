import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add CommonModule and ReactiveFormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: String =''

  private router = inject(Router);
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Registration successful:', formData);
      const payload = {
        nickname: formData.nickname,
        email: formData.email,
        password: formData.password,
      };
      this.http.post('http://localhost:8080/users', payload).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          alert('Sign-up successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during sign-up:', error);
          this.errorMessage = 'Failed to register user. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please ensure all fields are filled out correctly.';
    }
  }
}


