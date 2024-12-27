import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../services/token.service' // Import the TokenService
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { HistoriqueComponent } from '../partials/historique/historique.component';
@Component({
  selector: 'app-myuser',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HistoriqueComponent],
  templateUrl: './myuser.component.html',
  styleUrl: './myuser.component.css'
})
export class MyuserComponent {
    imcForm: FormGroup;
    imcResult: number | null = null;
    imcMessage: string | null = null;
    errorMessage:string | null = null;
    showHistorique: boolean = false;

    toggleHistorique(): void {
      this.showHistorique = !this.showHistorique;
    }
    constructor( private fb: FormBuilder,private http: HttpClient,private tokenService: TokenService ) {
      this.imcForm = this.fb.group({
        age: ['', [Validators.required, Validators.min(5)]],
        gender: ['', Validators.required],
        height: ['', [Validators.required, Validators.min(50)]],
        weight: ['', [Validators.required, Validators.min(10)]],
      });
    }
    calculateIMC(): void {
    if (this.imcForm.valid) {
      const formData = this.imcForm.value;
      const userId = this.tokenService.getId();
      console.log(userId);
      const token = this.tokenService.getToken();

      const payload = {
        ...formData,
        userId: userId // Attach the user ID
      };

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.post('http://localhost:8080/api/imc', payload, { headers }).subscribe({
        next: (response: any) => {
          console.log('Nutrition profile saved successfully:', response);

          this.imcMessage = response.bmiClassification;
          this.imcResult=response.bmi
          console.log(this.imcMessage,this.imcResult)

          alert('Nutrition profile submitted successfully!');
        },
        error: (error) => {
          console.error('Error saving nutrition profile:', error);
          this.errorMessage = 'Failed to submit the nutrition profile. Please try again.';
        }
      });
    }
  }
}


