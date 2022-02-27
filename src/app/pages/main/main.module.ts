import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule} from '@angular/material/sidenav';
import { AboutComponent } from './about/about.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemCardContainerComponent } from './item-card-container/item-card-container.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainSideNavComponent } from './main-side-nav/main-side-nav.component';
import { ItemPageComponent } from './greet-print/item-page/item-page.component';
import { CategoryFilterPipe } from '../../pipes/category-filter.pipe';
import { GreetPrintComponent } from './greet-print/greet-print.component';
import { BagsComponent } from './bags/bags.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
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


@NgModule({
  declarations: [AboutComponent, ItemCardComponent, ItemCardContainerComponent, MainHeaderComponent, MainSideNavComponent, ItemPageComponent, CategoryFilterPipe, GreetPrintComponent, BagsComponent, MainFooterComponent, CalendarsComponent, MainComponent, CalendarPageComponent, LogosComponent, PortraitsComponent, PortraitPageComponent, LogoPageComponent, IllustrationsComponent, IllustrationPageComponent, BagPageComponent, TShirtsComponent, TShirtPageComponent, NotebooksComponent, NotebookPageComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgbCarouselModule

  ],
  exports:[],
  providers: [],
  bootstrap: [MainComponent],
})
export class MainModule {}
