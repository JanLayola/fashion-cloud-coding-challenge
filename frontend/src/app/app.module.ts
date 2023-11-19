import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatformNavigationComponent } from './components/platform-navigation/platform-navigation.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {APIInterceptor} from "./services/api-interceptor/api-interceptor.service";
import { CardListWidgetComponent } from './widgets/card-list-widget/card-list-widget.component';
import CardComponent from "./components/card/card.component";
import { DropdownWidgetComponent } from './widgets/dropdown-widget/dropdown-widget.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PlatformNavigationComponent,
    CardListWidgetComponent,
    CardComponent,
    DropdownWidgetComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
