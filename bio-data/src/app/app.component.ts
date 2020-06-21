import { Component } from '@angular/core';
import {CommonService} from './common.service'; 
import {configData} from './../environments/configData'
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title :any = 'resume';
  constructor(public newService :CommonService,private _lightbox: Lightbox) {
  	console.log("configData",configData)
  }
  imgroot : string = configData.apiUrl;
  profiledata : any;
  familydata:any;
  educationdata: any;
  imgnotfornd :  boolean = false;
  imageData : any;
  _albums : any = [];
  ngOnInit() {
  	this.getUserProfile();
  	this.getUserFamily();
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
  getUserFamily(){
  	this.newService.getdata("Family/getFamily").subscribe(data=>{
		if(data.response == "data not exist"){
		}else{
			this.familydata =JSON.parse(data.data.familyarray);
      
		}
	},(err) =>{
		
	})
  }
  getUserEducation(){
  	this.newService.getdata("Education/getEducation").subscribe(data=>{
		if(data.response == "data not exist"){
		}else{
			this.educationdata = JSON.parse(data.data.educationarray)[0];
			
		}
	},(err) =>{
		
	})
  }
  getUserGalleryImage(){
    this.newService.getdata("GalleryImage/getData").subscribe(data=>{
    if(data.response == "data not exist"){
    }else{
      this.imgnotfornd = true;
      this.imageData = data.data;
      //this.educationdata = JSON.parse(data.data.educationarray)[0];
      this.imageData.forEach((imgdate,index)=>{
         const album = {
           src: this.imgroot+"/"+imgdate.profilepic,
           caption: imgdate.title,
           thumb: this.imgroot+"/"+imgdate.profilepic
        };
        this._albums.push(album);
      });
      
    }
  },(err) =>{
    
  })
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
