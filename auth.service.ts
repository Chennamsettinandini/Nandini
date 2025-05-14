import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUsers() {
    throw new Error('Method not implemented.');
  }
  router: any;
  constructor() {}
  http = inject(HttpClient);

register(name: string, email: string, password: string) 
  {
    return this.http.post(environment.apiUrl + '/auth/register', {
      name,
      email,
      password,
    });
  }
  getmyusers()
  {
       return this.http.get<any[]>(environment.apiUrl + '/auth/users');
  }
  deleteUser(email:string)
  {
     return this.http.delete(environment.apiUrl + `/auth/users/${email}`);
  }
updateUser(oldName: string, oldEmail: string, newName: string, newEmail: string)
{
  console.log(oldEmail);
  console.log(newName);
  return this.http.post(environment.apiUrl + `/auth/update`, {
    oldName,
    oldEmail,
    newName,
    newEmail
  });
}
login(email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/login', {
      email,
      password,
    });
  }
  get isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
  get isAdmin() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }

  get userName() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).name;
    }
    return null;
  }
  get userEmail() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).email;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
