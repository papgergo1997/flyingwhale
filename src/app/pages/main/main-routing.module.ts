import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ItemPageComponent } from './greet-print/item-page/item-page.component';
import { GreetPrintComponent } from './greet-print/greet-print.component';
import { BagsComponent } from './bags/bags.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { MainComponent } from './main.component';
import { CalendarPageComponent } from './calendars/calendar-page/calendar-page.component';
import { LogosComponent } from './logos/logos.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'calendars', component: CalendarsComponent },
      { path: 'calendars/:id', component: CalendarPageComponent },
      { path: 'bags', component: BagsComponent },
      { path: 'bags/:id', component: ItemPageComponent },
      { path: 'greet-print', component: GreetPrintComponent },
      { path: 'greet-print/:id', component: ItemPageComponent },
      {path: 'logos', component: LogosComponent},
      { path: 'about', component: AboutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
