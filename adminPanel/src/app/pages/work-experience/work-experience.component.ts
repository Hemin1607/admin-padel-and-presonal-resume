import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkExperienceService } from '../../services/workexperience.service';


@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {
    dynamicForm: FormGroup;
    submitted = false;
    currentUser : any;
  constructor(private formBuilder: FormBuilder ,private workexperienceservice : WorkExperienceService,private toastr: ToastrService) { }

  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.workexperience as FormArray; }
  ngOnInit() {
  	this.dynamicForm = this.formBuilder.group({
        workexperience: new FormArray([])
    });
  	this.getOneExperience();
  }
  addFormArray() {
        this.t.push(this.formBuilder.group({
            placename: ['', Validators.required],
            designation: ['', Validators.required],
            joinyearmonth: ['', Validators.required],
            leaveyearmonth: ['', Validators.required],
            contact: [''],
            about: ['', Validators.required]
        }));
  }
  removeFormArray(i){
    	this.t.removeAt(i);
    	this.onSubmit();
  }
    getOneExperience(){
  	    this.currentUser = JSON.parse(sessionStorage.getItem('token'));
    	var userdata = {
    		user_id : this.currentUser.id,
    		token : this.currentUser.token
    	}
    	this.workexperienceservice.getWorkExperience(userdata).subscribe(data=>{
    		if(data.response == "data not exist"){
    			this.addFormArray();
    		}else{
    			if(data.data.workexperience){
    				JSON.parse(data.data.workexperience).forEach(workexperience =>{
    					this.t.push(this.formBuilder.group({
				            placename: [workexperience.placename, Validators.required],
				            designation: [workexperience.designation, Validators.required],
				            joinyearmonth: [workexperience.joinyearmonth, Validators.required],
				            leaveyearmonth: [workexperience.leaveyearmonth, Validators.required],
				            contact: [workexperience.contact],
				            about: [workexperience.about, Validators.required]
				        }));
    				});
    			}
    		}
    	},(err) =>{
    		
    	})
    }
  	onSubmit(){
    	this.submitted = true;
    	if (this.dynamicForm.invalid) {
            return;
        }
        this.currentUser = JSON.parse(sessionStorage.getItem('token'));
        var insertArray =this.dynamicForm.value.workexperience;
         if(insertArray.length == 0){
        	this.toastr.error('<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span>Add Work Experience..!!', '', {
	           closeButton: true,
	           enableHtml: true,
	           toastClass: "alert alert-danger alert-with-icon",
	           positionClass: 'toast-top-center' ,
	           timeOut: 3000
		    });
        }else{
        	var userdata = {
	    		user_id : this.currentUser.id,
	    		token : this.currentUser.token,
	    		insertArray : JSON.stringify(insertArray)
	    	}
	    	this.workexperienceservice.saveWorkExperience(userdata).subscribe(data=>{
        		this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Work Experience save successfully', '', {
		           closeButton: true,
		           enableHtml: true,
		           toastClass: "alert alert-success alert-with-icon",
		           positionClass: 'toast-top-center' ,
		            timeOut: 3000
		        });
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
