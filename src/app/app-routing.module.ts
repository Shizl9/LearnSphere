import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { CoursesListComponent } from './courses-list/courses-list.component';
import { EnrollmentDashboardComponent } from './enrollment-dashboard/enrollment-dashboard.component';


const routes: Routes = [
  { path: 'courses', component: CoursesListComponent },
  { path: 'dashboard', component: EnrollmentDashboardComponent },
  { path: '', redirectTo: 'courses', pathMatch: 'full' }
];
=======

const routes: Routes = [];
>>>>>>> 98d8d6c74a0bfe5816eb749557b682968fada1dd

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
