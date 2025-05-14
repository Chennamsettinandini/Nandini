import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CategoryService } from '../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//interface User {
  //id: string;
  //name: string;
  //email: string;
//}
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,RouterModule,FormsModule,CommonModule, MatPaginatorModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent
 {
   authService = inject(AuthService);
  router = inject(Router);
  users: any[] = [];
  id:any;
  editingUser:any;
  ngOnInit(): void {
    this.getAllUsers();
  }
  deleteUser(email: string): void {
  if (!confirm(`Are you sure you want to delete the user with email: ${email}?`)) {
    return;
  }
  this.authService.deleteUser(email).subscribe({
    next: () => {
      alert("User deleted successfully!");
      this.getAllUsers(); 
    },
    error: (err: any) => {
      console.error("Delete failed:", err);
      alert("Something went wrong! Please try again.");
    }
  });
}
  cancelEdit()
  {}
  getAllUsers(): void {
    this.authService.getmyusers().subscribe({
      next: (result: any[]) => {
        console.log("Fetched Users:", result);
        this.users = result;

        console.log("data fetched by you is ",this.users);
        console.log("check at 1 ",this.users[1])
      },
      error: (err) => {
        console.error("Failed to fetch users", err);
      }
    });
  }
 }