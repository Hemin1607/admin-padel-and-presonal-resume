import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonService} from '../common.service'; 
import {configData} from '../../environments/configData'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input()profiledata : any;
   contactFormGroup: FormGroup;
    submitted = false;
  constructor(private _formBuilder: FormBuilder,private newService :CommonService) { 
	  this.contactFormGroup = this._formBuilder.group({
	        email: ['',[Validators.email,Validators.required]],
	        subject : ['',Validators.required],
	        name : ['',Validators.required],
	        message : ['',Validators.required]
	    });
	}

  ngOnInit() {
  }
 get f() { return this.contactFormGroup.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.contactFormGroup.invalid) {
        return;
    }
    
    var userdata =this.contactFormGroup.value;
    userdata.user_id = configData.user_id
    
    this.newService.postdata("ContactDetails",userdata).subscribe(data=>{
      if(data.response == "data not exist"){
      }else{
        console.log("data",data)
      }
    },(err) =>{
      
    })
  }
}
