import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './_helpers';
import { IndexCoreModule } from './services/index.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { CKEditorModule } from 'ckeditor4-angular';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { UserloginComponent } from './userlogin/userlogin.component';


import { LightboxModule } from 'ngx-lightbox';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    IndexCoreModule,
    CKEditorModule,
    ToastrModule.forRoot(),
    LightboxModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, UserloginComponent],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
