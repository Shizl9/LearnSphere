
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesListComponent } from './pages/courses/courses-list.component';
import { EnrollmentDashboardComponent } from './portals/student/dashboard/enrollment-dashboard.component';

const routes: Routes = [
  { path: 'courses', component: CoursesListComponent },
  { path: 'dashboard', component: EnrollmentDashboardComponent },
  { path: '', redirectTo: 'courses', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
