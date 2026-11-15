
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { CoursesListComponent } from './pages/courses/courses-list.component';
import { CourseCardComponent } from './shared/ui/course-card/course-card.component';
import { EnrollmentDashboardComponent } from './portals/student/dashboard/enrollment-dashboard.component';
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
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
