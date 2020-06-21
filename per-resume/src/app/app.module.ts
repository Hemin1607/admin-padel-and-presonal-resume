import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from './common.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EducationComponent } from './education/education.component';
import { WorkComponent } from './work/work.component';
import { AwardsComponent } from './awards/awards.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillComponent } from './skill/skill.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    AboutComponent,
    EducationComponent,
    WorkComponent,
    AwardsComponent,
    ProjectsComponent,
    SkillComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
