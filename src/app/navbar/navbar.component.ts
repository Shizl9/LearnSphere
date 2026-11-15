
import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public enrollService: EnrollmentService) {}

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark');

    const theme = document.body.classList.contains('dark')
      ? 'dark'
      : 'light';

    localStorage.setItem('theme', theme);
  }
}
