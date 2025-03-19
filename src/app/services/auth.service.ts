import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly users = [
    { email: 'user@demo.com', password: '123456' }
  ];

  constructor(private router: Router) {}

  getUsers() {
    return this.users;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('token', 'user_authenticated');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
