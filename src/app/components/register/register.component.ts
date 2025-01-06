import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/domain/services/register.service/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { GoogleAuthService } from '../../../core/domain/services/register.service/google-auth.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CheckboxModule, ButtonModule, InputTextModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private googleAuthService = inject(GoogleAuthService);

  public registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z\s]+$/)]], // Valida nombre completo
    userName: ['', [Validators.required, Validators.minLength(3)]], // Valida nombre de usuario
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$')]]
  });
  errorMessage: string | undefined;




  get fullName() {
    return this.registerForm.get('fullName');
  }
  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  ngOnInit(): void {
    // Inicializamos el inicio de sesión con Google
    this.googleAuthService.initializeGoogleSignIn(this.handleGoogleLogin.bind(this));
  }

  // Manejo del inicio de sesión con Google
  handleGoogleLogin(): void {
    this.googleAuthService.initializeGoogleSignIn((user: any) => {
      const userData = {
        fullName: user.name,
        email: user.email,
        picture: user.picture,
        authProvider: 'google', // Indicar que el registro es a través de Google
      };

      this.authService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Registro exitoso con Google', response);
          this.router.navigate(['/dashboard']); // Redirigir al dashboard u otra página
        },
        error: (error) => {
          console.error('Error en el registro con Google', error);
          this.errorMessage = 'Hubo un problema con el registro. Por favor, intenta de nuevo más tarde.';
        },
      });
    });

  }
  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      // Llamar al servicio de autenticación para registrar al usuario
      this.authService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']); // Redirigir a la página de login después del registro
        },
        error: (error) => {
          console.error('Error en el registro', error);
           // Muestra un mensaje de error amigable
        if (error.status === 400) {
          this.errorMessage = 'El correo ya está registrado. Intenta con otro correo.';
        } else {
          this.errorMessage = 'Hubo un problema con el registro. Por favor, intenta de nuevo más tarde.';
        }
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}


