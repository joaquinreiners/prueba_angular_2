import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  imageSrc = 'login.svg';
  user = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    const defaultUser = this.authService.getUsers()[0]; 
    this.user = { email: defaultUser.email, password: defaultUser.password };
    this.email = this.user.email;
    this.password = this.user.password;
  }

  login() {
    this.errorMessage = ''; 

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Invalid email format';
      return;
    }

    const isValid = this.authService.login(this.email, this.password);

    if (isValid) {
      this.imageSrc = 'login-ok.svg';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);;
    } else {
      this.errorMessage = 'Incorrect credentials';
      this.imageSrc = 'login-fail.svg';
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
