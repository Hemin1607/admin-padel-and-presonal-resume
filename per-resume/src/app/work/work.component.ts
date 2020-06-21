import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service'; 
import {configData} from '../../environments/configData'
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  constructor(private newService :CommonService) { }
  workexp :any;
  ngOnInit() {
  	this.getUserWork()
  }
  getUserWork(){
  	this.newService.getdata("WorkExperience/getWorkExperience").subscribe(data=>{
		if(data.response == "data not exist"){
		}else{
			this.workexp = JSON.parse(data.data.workexperience);
			this.workexp.sort(function(a, b) {
			   return parseInt(b.joinyearmonth.split("-")[1]) - parseInt(a.joinyearmonth.split("-")[1]);
			})
		}
	},(err) =>{
		
	})
  }
}
