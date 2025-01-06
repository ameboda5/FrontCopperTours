import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private clientId = '1010196099610-1sp5dft5tam25cpnebtjc36tnhdu9d72.apps.googleusercontent.com'; // Reemplaza con tu client ID de Google

  constructor() {}

  initializeGoogleSignIn(callback: (user: any) => void): void {
    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response: any) => this.handleCredentialResponse(response, callback),
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInButton')!,
      {
        theme: 'outline',
        size: 'large',
      }
    );
  }

  private handleCredentialResponse(response: any, callback: (user: any) => void): void {
    const token = response.credential;
    const user = this.parseJwt(token);  // Parseamos el token para obtener la información del usuario
    callback(user);  // Pasamos los datos del usuario a la función callback
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
