import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { HomeComponent } from '../../pages/home/home.component';
import { UsersComponent } from '../../pages/users/users.component';
import { EducationComponent } from '../../pages/education/education.component';
import { WorkExperienceComponent } from '../../pages/work-experience/work-experience.component';
import { SkillsComponent } from '../../pages/skills/skills.component';
import { OtherachievementComponent } from '../../pages/otherachievement/otherachievement.component';
import { FamilyComponent } from '../../pages/family/family.component';
import { GalleryimageComponent } from '../../pages/galleryimage/galleryimage.component';

import { CoverImageComponent } from '../../pages/cover-image/cover-image.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,  
    NgbModule,
    CKEditorModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    UsersComponent,
    EducationComponent,
    WorkExperienceComponent,
    SkillsComponent,
    OtherachievementComponent,
    FamilyComponent,
    GalleryimageComponent,
    CoverImageComponent
  ]
})
export class AdminLayoutModule {}
