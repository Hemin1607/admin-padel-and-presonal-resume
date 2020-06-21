import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  profileFormGroup: FormGroup;
  submitted : any = false;
  currentUser: any;
  fileData: File = null;
  constructor(private _formBuilder: FormBuilder , private userservice : UserService,private toastr: ToastrService) {
  	this.profileForm()
  }

  ngOnInit() {
    this.getOneUser();
  }

  profileForm(){
  	this.profileFormGroup = this._formBuilder.group({
  		name : ['',Validators.required],
  		lastname : ['',Validators.required],
  		email: ['',[Validators.email,Validators.required]],
      phoneno : ['',Validators.required],
	    address : ['',Validators.required],
	    city : [''],
	    district : [''],
	    country : [''],
	    postalcode : [''],
	    aboutme : [''],
	    designation: ['',Validators.required],
	    bod: ['',Validators.required],
      picprofile: [''],
  	})
  }

  get f() { return this.profileFormGroup.controls; }

 
  getOneUser(){
    this.currentUser = JSON.parse(sessionStorage.getItem('token'));
    var user_id= this.currentUser.id
    var jsonUser = {
      "user_id" : this.currentUser.id,
      "token" : this.currentUser.token
    }
    //bug--  put condition foe check user exist or not
    this.userservice.getOneUser(jsonUser).subscribe(data=>{
      this.profileFormGroup = this._formBuilder.group({
      name : [data.data.name,Validators.required],
      lastname : [data.data.lastname,Validators.required],
      email: [data.data.email,[Validators.email,Validators.required]],
      phoneno : [data.data.phoneno,Validators.required],
      address : [data.data.address,Validators.required],
      city : [data.data.city],
      district : [data.data.district],
      country : [data.data.country],
      postalcode : [data.data.postalcode],
      aboutme : [data.data.aboutme],
      designation: [data.data.designation,Validators.required],
      bod: [data.data.bod,Validators.required],
      picprofile: [''],
    })
     var dataArray =data.data.bod.split("-")
    this.profileFormGroup.get('bod').setValue({
      year: parseInt(dataArray[0]),
      month:parseInt(dataArray[1]),
      day: parseInt(dataArray[2])
    });
    },(err)=>{

    })
  }
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
    var bodarray =this.profileFormGroup.get('bod').value;
    var bod = bodarray.year+ "-"+bodarray.month+"-"+bodarray.day
    const formData = new FormData()
    formData.append('img_front', this.profileFormGroup.get('picprofile').value);
    formData.append('user_id', user_id);
    formData.append('name', this.profileFormGroup.get('name').value);
    formData.append('lastname', this.profileFormGroup.get('lastname').value);
    formData.append('email', this.profileFormGroup.get('email').value);
    formData.append('phoneno', this.profileFormGroup.get('phoneno').value);
    formData.append('address', this.profileFormGroup.get('address').value);
    formData.append('city', this.profileFormGroup.get('city').value);
    formData.append('district', this.profileFormGroup.get('district').value);
    formData.append('country', this.profileFormGroup.get('country').value);
    formData.append('postalcode', this.profileFormGroup.get('postalcode').value);
    formData.append('aboutme', this.profileFormGroup.get('aboutme').value);
    formData.append('designation', this.profileFormGroup.get('designation').value);
    formData.append('bod', bod);
    formData.append('token', this.currentUser.token);
    this.userservice.saveUser(formData).subscribe(data=>{
      if(data){
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Information save successfully', '', {
           closeButton: true,
           enableHtml: true,
           toastClass: "alert alert-success alert-with-icon",
           positionClass: 'toast-top-center' ,
            timeOut: 3000
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


}
