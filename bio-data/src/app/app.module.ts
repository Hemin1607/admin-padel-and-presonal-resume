import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';


import { AppComponent } from './app.component';
import {CommonService} from './common.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    LightboxModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
