import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EducationService } from '../../services/education.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
	dynamicForm: FormGroup;
    submitted = false;
    currentUser : any;
  	constructor(private formBuilder: FormBuilder ,private educationservice : EducationService,private toastr: ToastrService) { }

	get f() { return this.dynamicForm.controls; }
	get t() { return this.f.education as FormArray; }

  	ngOnInit() {
  	 this.dynamicForm = this.formBuilder.group({
            education: new FormArray([])
        });
  	 
  	 this.getOneEducation();
  	}

  	addFormArray() {
        this.t.push(this.formBuilder.group({
            schoolclg: ['', Validators.required],
            unibord: ['', Validators.required],
            joinyearmonth: ['', Validators.required],
            passyearmonth: ['', Validators.required],
            marks: ['', Validators.required],
            title: ['', Validators.required],
            about: ['', Validators.required]
        }));
    }
    removeFormArray(i){
    	this.t.removeAt(i);
        this.onSubmit();
    }

    onSubmit(){
    	this.submitted = true;
    	if (this.dynamicForm.invalid) {
            return;
        }
        this.currentUser = JSON.parse(sessionStorage.getItem('token'));
        var insertArray =this.dynamicForm.value.education;
        if(insertArray.length == 0){
        	this.toastr.error('<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span>Add Education..!!', '', {
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
        	this.educationservice.saveEducation(userdata).subscribe(data=>{
        		this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Education save successfully', '', {
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

    getOneEducation(){
    	this.currentUser = JSON.parse(sessionStorage.getItem('token'));
    	var userdata = {
    		user_id : this.currentUser.id,
    		token : this.currentUser.token
    	}
    	this.educationservice.getEducation(userdata).subscribe(data=>{
    		
    		if(data.response == "data not exist"){
    			this.addFormArray();
    		}else{
    			if(data.data.educationarray){
    				JSON.parse(data.data.educationarray).forEach(education =>{
    					this.t.push(this.formBuilder.group({
				            schoolclg: [education.schoolclg, Validators.required],
				            unibord: [education.unibord, Validators.required],
				            joinyearmonth: [education.joinyearmonth, Validators.required],
				            passyearmonth: [education.passyearmonth, Validators.required],
				            marks: [education.marks, Validators.required],
				            title: [education.title, Validators.required],
				            about: [education.about, Validators.required]
				        }));
    				})
    			}
    		}
    	},(err) =>{
    		
    	})
    }

}
