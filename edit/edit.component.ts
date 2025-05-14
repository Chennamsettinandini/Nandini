import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule, AbstractControl, ValidationErrors} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent 
{
  
 formBuilder = inject(FormBuilder);
   route = inject(ActivatedRoute);
  editForm: FormGroup;
  name:any;
  email:any;
  constructor() {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email,this.gmailValidator]]
    });
  }
   gmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { notGmail: true };
    }
    return null;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    if (params['name'] && params['email']) {
      this.editForm.patchValue({  
        name: params['name'],  
        email: params['email']  
      });
    }
  });
  }
  authService = inject(AuthService);
  router=inject(Router);
save() {
  if(this.editForm.valid) {
    this.route.queryParams.subscribe(params => {
      const oldName = params['name'];
      const oldEmail = params['email'];
      const newName = this.editForm.get('name')?.value;
      const newEmail = this.editForm.get('email')?.value;

      if (!oldEmail) {
        alert("Error: Missing email for update!");
        return;
      }
      this.authService.updateUser(oldName, oldEmail, newName, newEmail).subscribe({
        next: (result: any) => {
          console.log("Updated User:", result);
          localStorage.setItem("user", JSON.stringify(result.user));
          alert("Profile Updated Successfully!");
          this.router.navigateByUrl("/");
        },
        error: (err: any) => {
          console.error("Update Failed:", err);
          alert("Something went wrong! Please try again.");
        }
      });
    });
  }
}
}
