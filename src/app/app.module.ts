import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PieComponent } from './pie/pie.component';
import { LastMonthComponent } from './last-month/last-month.component';
import { LastSixMonthComponent } from './last-six-month/last-six-month.component';
import { LastYearComponent } from './last-year/last-year.component';
import { HttpClientModule } from '@angular/common/http' 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PieComponent,
    LastMonthComponent,
    LastSixMonthComponent,
    LastYearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
