import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FamilyService } from '../../services/family.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  	dynamicForm: FormGroup;
    submitted = false;
    currentUser : any;
  	constructor(private formBuilder: FormBuilder ,private toastr: ToastrService,private familyservice :FamilyService) { }

  	get f() { return this.dynamicForm.controls; }
	get t() { return this.f.siblings as FormArray; }

	ngOnInit() {
		this.dynamicForm = this.formBuilder.group({
			father : ['',Validators.required],
			fathername : ['',Validators.required],
			fatherlastname : ['',Validators.required],
			fatheroccupation: ['',Validators.required],
			mother : ['',Validators.required],
			mothername : ['',Validators.required],
			motherlastname : ['',Validators.required],
			motheroccupation: ['',Validators.required],
            maternal: ['',Validators.required],
            maternalname: ['',Validators.required],
            maternallastname: ['',Validators.required],
            maternaladdress: ['',Validators.required],
            siblings: new FormArray([])
        });
        this.getFamily();
	}

	addFormArray() {
        this.t.push(this.formBuilder.group({
            sibling: ['',Validators.required],
            siblingname: ['',Validators.required],
            siblinglastname: ['',Validators.required],
            siblingmarried:[''],
            siblinggender:['Male',Validators.required]
        }));
    }

    onSubmit(){
    	this.submitted = true;

    	if (this.dynamicForm.invalid) {
            return;
        }
        this.currentUser = JSON.parse(sessionStorage.getItem('token'));
        var insertArray =this.dynamicForm.value;
        var userdata = {
                user_id : this.currentUser.id,
                token : this.currentUser.token,
                insertArray : JSON.stringify(insertArray),
                
            }
        this.familyservice.saveFamily(userdata).subscribe(data=>{
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

    removeFormArray(i){
    	this.t.removeAt(i);
        this.onSubmit();
    }

    getFamily(){
        this.currentUser = JSON.parse(sessionStorage.getItem('token'));
        var userdata = {
            user_id : this.currentUser.id,
            token : this.currentUser.token
        }
        this.familyservice.getFamily(userdata).subscribe(data=>{
            
            if(data.response == "data not exist"){
                this.addFormArray();
            }else{
                if(data.data.familyarray){
                  var tmpfamiltdata =  JSON.parse(data.data.familyarray);
                  
                    tmpfamiltdata.siblings.forEach((siblins,index) =>{
                        this.t.push(this.formBuilder.group({
                            sibling: [siblins.sibling,Validators.required],
                            siblingname: [siblins.siblingname,Validators.required],
                            siblinglastname: [siblins.siblinglastname,Validators.required],
                            siblingmarried:[siblins.siblingmarried],
                            siblinggender:[siblins.siblinggender,Validators.required]
                        }));
                        if(tmpfamiltdata.siblings.length == index+1){
                            this.dynamicForm = this.formBuilder.group({
                                father : [tmpfamiltdata.father,Validators.required],
                                fathername : [tmpfamiltdata.fathername,Validators.required],
                                fatherlastname : [tmpfamiltdata.fatherlastname,Validators.required],
                                fatheroccupation: [tmpfamiltdata.fatheroccupation,Validators.required],
                                mother : [tmpfamiltdata.mother,Validators.required],
                                mothername : [tmpfamiltdata.mothername,Validators.required],
                                motherlastname : [tmpfamiltdata.motherlastname,Validators.required],
                                motheroccupation: [tmpfamiltdata.motheroccupation,Validators.required],
                                maternal: [tmpfamiltdata.maternal,Validators.required],
                                maternalname: [tmpfamiltdata.maternalname,Validators.required],
                                maternallastname: [tmpfamiltdata.maternallastname,Validators.required],
                                maternaladdress: [tmpfamiltdata.maternaladdress,Validators.required],
                                siblings : this.t
                            });
                        }
                    })
                }
            }
        },(err) =>{
            
        })
    }

}
