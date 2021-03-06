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
import { PortraitsComponent } from './portraits/portraits.component';
import { PortraitPageComponent } from './portraits/portrait-page/portrait-page.component';
import { LogoPageComponent } from './logos/logo-page/logo-page.component';
import { IllustrationsComponent } from './illustrations/illustrations.component';
import { IllustrationPageComponent } from './illustrations/illustration-page/illustration-page.component';
import { BagPageComponent } from './bags/bag-page/bag-page.component';
import { TShirtsComponent } from './t-shirts/t-shirts.component';
import { TShirtPageComponent } from './t-shirts/t-shirt-page/t-shirt-page.component';
import { NotebooksComponent } from './notebooks/notebooks.component';
import { NotebookPageComponent } from './notebooks/notebook-page/notebook-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'illustrations', component: IllustrationsComponent },
      { path: 'illustrations/:id', component: IllustrationPageComponent },
      { path: 'portraits', component: PortraitsComponent },
      { path: 'portraits/:id', component: PortraitPageComponent },
      { path: 'calendars', component: CalendarsComponent },
      { path: 'calendars/:id', component: CalendarPageComponent },
      { path: 'bags', component: BagsComponent },
      { path: 'bags/:id', component: BagPageComponent },
      { path: 'greet-print', component: GreetPrintComponent },
      { path: 'greet-print/:id', component: ItemPageComponent },
      { path: 'logos', component: LogosComponent },
      { path: 'logos/:id', component: LogoPageComponent },
      { path: 't-shirts', component: TShirtsComponent },
      { path: 't-shirts/:id', component: TShirtPageComponent },
      { path: 'notebooks', component: NotebooksComponent },
      { path: 'notebooks/:id', component: NotebookPageComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
