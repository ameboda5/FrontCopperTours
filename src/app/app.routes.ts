import { Routes } from '@angular/router';



export const appRoutes: Routes = [

  { path: '', loadComponent : ()=> import("./components/home/home.component").then(m => m.HomeComponent)},  // Página de inicio
  { path: "About", loadComponent: ()=> import("./components/about/about.component").then(m=> m.AboutComponent)}, //Sobre nosotros
  { path: "Services", loadComponent: ()=> import("./components/services/services.component").then(m=> m.ServicesComponent) }, //Servicios ofrecidos
  { path: "Destinations", loadComponent: ()=>import("./components/destinations/destinations.component").then(m=> m.DestinationsComponent) }, //Destinos
  { path: "Blog",loadComponent: ()=>import("./components/blog/blog.component").then(m=> m.BlogComponent)}, //Blog
  { path: "Register", loadComponent: ()=>import("./components/register/register.component").then(m=> m.RegisterComponent)}, // Registro
  { path: "Login", loadComponent: ()=>import("./components/login/login.component").then(m=> m.LoginComponent)},
  { path: "**", loadComponent: ()=>import("./components/not-found/not-found.component").then(m=> m.NotFoundComponent) }// Página no encontrada (404)
];
