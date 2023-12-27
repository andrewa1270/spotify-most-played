import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PieComponent } from './pie/pie.component';
import { LastMonthComponent } from './last-month/last-month.component';
import { LastSixMonthComponent } from './last-six-month/last-six-month.component';
import { LastYearComponent } from './last-year/last-year.component';

const routes: Routes = [
  { path: 'pie', component: PieComponent},
  { path: 'last-month', component: LastMonthComponent},
  { path: 'last-six-months', component: LastSixMonthComponent},
  { path: 'last-year', component: LastYearComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
