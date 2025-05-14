import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {
authService=inject(AuthService)
}
