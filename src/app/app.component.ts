import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputSwitchModule, FormsModule, KnobModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontCooperTour';

  ngOnInit(): void {
    // Selecciona el navbar y el contenedor principal
    const navbar = document.querySelector('app-navbar');
    const mainContent = document.querySelector('main');

    // Función para ajustar el espaciado dinámico
    const adjustPadding = () => {
      if (navbar && mainContent) {
        const navbarHeight = navbar.getBoundingClientRect().height; // Obtén la altura real del navbar
        (mainContent as HTMLElement).style.paddingTop = `${navbarHeight}px`; // Aplica el padding dinámico
      }
    };

    adjustPadding(); // Aplica el espaciado al cargar la página

    // Ajusta el espaciado al cambiar el tamaño de la ventana
    window.addEventListener('resize', adjustPadding);
  }
}
