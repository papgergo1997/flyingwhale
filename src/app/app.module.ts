import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/main/about/about.component';
import { ItemCardComponent } from './pages/main/item-card/item-card.component';
import { ItemCardContainerComponent } from './pages/main/item-card-container/item-card-container.component';
import { MainHeaderComponent } from './pages/main/main-header/main-header.component';
import { MainSideNavComponent } from './pages/main/main-side-nav/main-side-nav.component';
import { ItemPageComponent } from './pages/main/item-page/item-page.component';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { GreetPrintComponent } from './pages/main/greet-print/greet-print.component';
import { BagsComponent } from './pages/main/bags/bags.component';
import { MainFooterComponent } from './pages/main/main-footer/main-footer.component';
import { CalendarsComponent } from './pages/main/calendars/calendars.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [AppComponent, LoginComponent, AboutComponent, ItemCardComponent, ItemCardContainerComponent, MainHeaderComponent, MainSideNavComponent, ItemPageComponent, CategoryFilterPipe, GreetPrintComponent, BagsComponent, MainFooterComponent, CalendarsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    NgbModule,
    MatSidenavModule,
    MatTooltipModule,
    MatProgressSpinnerModule,

  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
