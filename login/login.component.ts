import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ForgotComponent } from '../../forgot/forgot.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule,RouterModule,HomeComponent,ForgotComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  
  formbuilder = inject(FormBuilder);
  loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
    password: ['', [Validators.required]]
  });
  authService = inject(AuthService);
  router=inject(Router);
 login() {
  if (this.loginForm.valid) {
    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe({
        next: (result: any) => {
          console.log(result);
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigateByUrl("/");
        },
        error: (err) => {
          console.error(err);
          alert(err.error?.error || "Invalid email or password! Please try again.");
        }
      });
  } else {
    alert("Enter valid credentials!");
  }
  }
}
