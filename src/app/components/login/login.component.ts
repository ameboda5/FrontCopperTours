import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../core/domain/services/login.service/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.access_token);
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/home']); // Cambia '/home' según tu ruta de redirección
      },
      (error) => {
        alert('Error al iniciar sesión: ' + error.error.message);
      }
    );
  }
}
