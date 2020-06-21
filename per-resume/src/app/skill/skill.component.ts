import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service'; 
import {configData} from '../../environments/configData'

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skilldata : any;
  constructor(private newService :CommonService) { }
  ngOnInit() {
  	this.getUserSkill();
  }
  getUserSkill(){
  	this.newService.getdata("Skills/getSkills").subscribe(data=>{
		if(data.response == "data not exist"){
		}else{
			this.skilldata = JSON.parse(data.data.skillsarray);
		}
	},(err) =>{
	})
  }
}
