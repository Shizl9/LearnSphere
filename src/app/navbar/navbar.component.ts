<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
=======
import { Component } from '@angular/core';
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
<<<<<<< HEAD
export class NavbarComponent  {

   constructor(public enrollService: EnrollmentService) {}

  toggleTheme() {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  }
  ngOnInit() {
  const theme = localStorage.getItem('theme');

  if (theme === 'dark') {
    document.body.classList.add('dark');
  }
}
   
}
=======
export class NavbarComponent {

}
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd
