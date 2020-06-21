import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from '../common.service'; 
import {configData} from '../../environments/configData'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input()profiledata : any;
  imagedata : any ="";
  constructor(private newService :CommonService) { }

  ngOnInit() {
  	console.log("=configData",configData)
  	this.getUserIamege()
  }

  ngOnChanges(change){
    
    
  }
  getUserIamege(){
  	this.newService.getdata("CoverImage/getData").subscribe(data=>{
		if(data.response == "data not exist"){
		}else{
			console.log("data",data.data[0].profilepic);
			this.imagedata =configData.apiUrl+"/"+data.data[0].profilepic;
		}
	},(err) =>{
		
	})
  }
  

}
