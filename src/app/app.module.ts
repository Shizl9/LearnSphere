import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { EnrollmentDashboardComponent } from './enrollment-dashboard/enrollment-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CoursesListComponent,
    CourseCardComponent,
    EnrollmentDashboardComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    AppRoutingModule,
    FormsModule
=======
    AppRoutingModule
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
