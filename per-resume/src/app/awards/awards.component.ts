
import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service'; 
import {configData} from '../../environments/configData'

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {

  constructor(private newService :CommonService) { }
  achievementdata : any;
  ngOnInit() {
  	this.getUserAwards()
  }
   getUserAwards(){
  	this.newService.getdata("OtherAchievement/getOtherAchievement").subscribe(data=>{
		if(data.response == "data not exist"){
		}else{
			this.achievementdata = JSON.parse(data.data.achievementarray);
		}
	},(err) =>{
		
	})
  }
  

}
