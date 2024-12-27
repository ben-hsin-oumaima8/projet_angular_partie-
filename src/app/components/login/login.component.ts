import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token.service';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,
    HttpClientModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private authService = inject(AuthService);
  private token = inject(TokenService);
  private account = inject(AccountService);
  private router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });
  constructor(private toastr: ToastrService){}
  ngOnInit(): void {}

  signIn(){
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';
    this.authService.login({email,password}).subscribe(
      res => this.Reponse(res),
      err =>this.toastr.error('Error', 'Vérifier votre login et password',{
    timeOut:3000,
    positionClass: 'toast-bottom-right'
  })
  );

  }

  Reponse(data : any){
   this.token.handle(data);
   this.account.changeAuthStatus(true);
   this.toastr.success('Welcome', 'Connected with success !',{
    timeOut:3000,
    positionClass: 'toast-bottom-right'
  })
  this.router.navigateByUrl('/user')


  }

}
