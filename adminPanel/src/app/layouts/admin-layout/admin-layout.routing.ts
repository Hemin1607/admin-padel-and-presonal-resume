import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { HomeComponent } from '../../pages/home/home.component';
import { UsersComponent } from '../../pages/users/users.component';
import { EducationComponent } from '../../pages/education/education.component';
import { WorkExperienceComponent } from '../../pages/work-experience/work-experience.component';
import { SkillsComponent } from '../../pages/skills/skills.component';
import { OtherachievementComponent } from '../../pages/otherachievement/otherachievement.component';
import { FamilyComponent } from '../../pages/family/family.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { GalleryimageComponent } from '../../pages/galleryimage/galleryimage.component';
import { CoverImageComponent } from '../../pages/cover-image/cover-image.component';
export const AdminLayoutRoutes: Routes = [
  { 
  	path: "dashboard", 
  	component: DashboardComponent 
  },
  { 
  	path: "home", 
  	component: HomeComponent
  },
  { 
  	path: "user", 
 	 component: UsersComponent 
  },
  { 
    path: "education", 
    component: EducationComponent 
  },
  { 
    path: "work-experience", 
    component: WorkExperienceComponent 
  },
  { 
    path: "skills", 
    component: SkillsComponent 
  },
  { 
    path: "otherachievement", 
    component: OtherachievementComponent 
  },
  { 
    path: "family", 
    component: FamilyComponent 
  },{
    path : "gallery-image",
    component : GalleryimageComponent
  },{
    path : "cover-image",
    component : CoverImageComponent
  }

];
