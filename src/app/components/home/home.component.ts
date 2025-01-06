import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FeaturesComponent } from "./features/features.component";
import { GridCardComponent } from "./grid-card/grid-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule, RippleModule, FeaturesComponent, GridCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  avatars = ['assets/images/images/avatar-01.jpg',
    'assets/images/images/avatar-02.jpg',
    'assets/images/images/avatar-03.jpg',
    'assets/images/images/avatar-04.jpg',
    'assets/images/images/avatar-05.jpg',
    'assets/images/images/avatar-06.jpg'];

  constructor() {}
}
