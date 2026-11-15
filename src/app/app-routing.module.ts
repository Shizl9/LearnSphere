
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesListComponent } from './pages/courses/courses-list.component';
import { EnrollmentDashboardComponent } from './portals/student/dashboard/enrollment-dashboard.component';
import { Instructors } from './pages/instructors/instructors';
import { LearningPaths } from './pages/learning-paths/learning-paths';
import { Home } from './pages/home/home';

const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'learning-paths', component: LearningPaths },
  { path: 'instructors', component: Instructors },
  { path: 'courses', component: CoursesListComponent },
  { path: 'dashboard', component: EnrollmentDashboardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
