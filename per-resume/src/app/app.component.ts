import { Component,OnInit } from '@angular/core';
import * as $ from 'jquery';
import {CommonService} from './common.service'; 
import {configData} from './../environments/configData'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'personalresume';
  profiledata : any;
  educationdata:any;
  imageData : any;
  constructor(private newService :CommonService ){}
  ngOnInit() {
  	this.getUserProfile();
  	this.getUserEducation();
  	this.getUserGalleryImage();
  }
   getUserProfile(){
  	this.newService.getdata("SaveUser/getData").subscribe(data=>{
		if(data.response == "data not exist"){
		}else{
			this.profiledata =data.data;
      this.title = this.profiledata.name+" "+this.profiledata.lastname;
		}
	},(err) =>{
		
	})
  }
  
  getUserEducation(){
  	this.newService.getdata("Education/getEducation").subscribe(data=>{
		if(data.response == "data not exist"){
		}else{
			this.educationdata = JSON.parse(data.data.educationarray);
			
		}
	},(err) =>{
		
	})
  }
  getUserGalleryImage(){
    this.newService.getdata("GalleryImage/getData").subscribe(data=>{
    if(data.response == "data not exist"){
    }else{
      
      this.imageData = data.data;
      //this.educationdata = JSON.parse(data.data.educationarray)[0];
      /*this.imageData.forEach((imgdate,index)=>{
         const album = {
           src: this.imgroot+"/"+imgdate.profilepic,
           caption: imgdate.title,
           thumb: this.imgroot+"/"+imgdate.profilepic
        };
        this._albums.push(album);
      });*/
      
    }
  },(err) =>{
    
  })
  }

}
