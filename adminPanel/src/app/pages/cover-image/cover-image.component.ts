import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoverIamgeService } from '../../services/coverimage.service';
import {configData} from '../../../environments/configData'
import { ToastrService } from 'ngx-toastr';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-cover-image',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss']
})
export class CoverImageComponent implements OnInit {

  profileFormGroup: FormGroup;
  submitted : any = false;
  imageData  :any;
  imgroot : string =configData.apiUrl;
  currentUser :  any;
  _albums : any=[];
  id : any = "";
  filepath : any;
  constructor(private _formBuilder: FormBuilder,private _lightbox: Lightbox ,private toastr: ToastrService,private   galleyservice :CoverIamgeService) { }

  ngOnInit() {
  	
  	this.profileForm()
  	this.getAllImage();

  }
  profileForm(){
  	this.profileFormGroup = this._formBuilder.group({
  		title : ['',Validators.required],
        picprofile: [''],
  	})
  }
  get f() { return this.profileFormGroup.controls; }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileFormGroup.get('picprofile').setValue(file);
    }
  }
  saveData(e){  
  	this.submitted = true;
    if (this.profileFormGroup.invalid) {
            return;
    }
    this.currentUser = JSON.parse(sessionStorage.getItem('token'));
    var user_id= this.currentUser.id
   	console.log(this.profileFormGroup.get('picprofile').value,"pop")
    const formData = new FormData()
    formData.append('img_front', this.profileFormGroup.get('picprofile').value);
    formData.append('user_id', user_id);
    formData.append('title', this.profileFormGroup.get('title').value);
    formData.append('token', this.currentUser.token);
    formData.append('id',this.id);
    formData.append('file',this.filepath);
    if(this.profileFormGroup.get('picprofile').value){
    	this.galleyservice.saveImage(formData).subscribe(data=>{
	      if(data){
	      	this.getAllImage();
	        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Information save successfully', '', {
	           closeButton: true,
	           enableHtml: true,
	           toastClass: "alert alert-success alert-with-icon",
	           positionClass: 'toast-top-center' ,
	            timeOut: 3000
	        });
	         this.profileFormGroup.get('picprofile').setValue(undefined);
	         this.profileFormGroup.get('title').setValue('');
	      }
	    },(err)=>{
	      this.toastr.error('<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> Somthing wrong..!!', '', {
	           closeButton: true,
	           enableHtml: true,
	           toastClass: "alert alert-danger alert-with-icon",
	           positionClass: 'toast-top-center' ,
	            timeOut: 3000
	      });
	    })
    
    }else{
    	this.toastr.error('<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> Please select Image..!!', '', {
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-danger alert-with-icon",
           positionClass: 'toast-top-center' ,
            timeOut: 3000
      });
    }
    
  }
  getAllImage(){
  	this.currentUser = JSON.parse(sessionStorage.getItem('token'));
    var userdata = {
    		user_id : this.currentUser.id,
    		token : this.currentUser.token
    	}
       this._albums =[];
    this.galleyservice.getAllImage(userdata).subscribe(data=>{
	      if(data){
	        this.imageData = data.data;
          this.imageData.forEach((imgdate,index)=>{
            if(this.currentUser.id == imgdate.user_id){
              this.id = imgdate.id;
              this.filepath = imgdate.profilepic;
            }
           const album = {
             src: this.imgroot+"/"+imgdate.profilepic,
             caption: imgdate.title,
             thumb: this.imgroot+"/"+imgdate.profilepic
          };
          this._albums.push(album);
      });
      
	      }
	    },(err)=>{
	      this.toastr.error('<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> Somthing wrong..!!', '', {
	           closeButton: true,
	           enableHtml: true,
	           toastClass: "alert alert-danger alert-with-icon",
	           positionClass: 'toast-top-center' ,
	            timeOut: 3000
	      });
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
  deleteiamge(imageData){
    if (confirm("Are you sure want to delete Image ?")) {
     this.currentUser = JSON.parse(sessionStorage.getItem('token'));
      var userdata = {
        user_id : this.currentUser.id,
        token : this.currentUser.token,
        img_id : imageData.id,
        img_name : imageData.profilepic,
      }
      this.galleyservice.deleteIamge(userdata).subscribe(data=>{
        if(data){
          this.getAllImage();
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Image Deleted', '', {
               closeButton: true,
               enableHtml: true,
               toastClass: "alert alert-success alert-with-icon",
               positionClass: 'toast-top-center' ,
                timeOut: 3000
            });
        }
      },(err) =>{
        this.toastr.error('<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span>Somting Wrong..!!', '', {
             closeButton: true,
             enableHtml: true,
             toastClass: "alert alert-danger alert-with-icon",
             positionClass: 'toast-top-center' ,
             timeOut: 3000
        });
      })
    } 
    
  }

}
