import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public pieClick(){
    const routePath = "pie-chart"
    console.log("pie click")
  }
  public lastMonthClick(){
    const routePath = "last-month"
    console.log("last month click")
  }
  public sixMonthClick(){
    const routePath = "last-six-months"
    console.log("last 6 months")
  }
  public lastYearClick(){
    const routePath = "last-year"
    console.log("last year")
  }
}
