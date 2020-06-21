import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { EducationService } from './education.service';
import { WorkExperienceService } from './workexperience.service';
import { SkillsService } from './skills.service';
import { OtherAchievementService } from './otherachievement.service';
import { FamilyService } from './family.service';
import { GalleryService} from './galleryimage.service';
import {CoverIamgeService } from './coverimage.service'
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UserService,
  EducationService,
  WorkExperienceService,
  SkillsService,
  OtherAchievementService,
  FamilyService,
  GalleryService,
  CoverIamgeService
  ]
})
export class IndexCoreModule { }
