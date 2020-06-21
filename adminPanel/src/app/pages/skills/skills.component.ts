import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SkillsService } from '../../services/skills.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  currentUser : any;
  constructor(private formBuilder: FormBuilder ,private toastr: ToastrService,private skillsservice :SkillsService) { }
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.skillsform as FormArray; }
  ngOnInit() {
  	this.dynamicForm = this.formBuilder.group({
        skillsform: new FormArray([])
    })
    this.getOneSkills();
  }
  addFormArray() {
    this.t.push(this.formBuilder.group({
      skillname: ['', Validators.required],
      skillsper: ['', Validators.required],
    }));
  }
   removeFormArray(i){
    	this.t.removeAt(i);
    	this.onSubmit();
   }
   onSubmit(){
   	  this.submitted =  true;
      if (this.dynamicForm.invalid) {
        return;
      }
      this.currentUser = JSON.parse(sessionStorage.getItem('token'));
      var insertArray =this.dynamicForm.value.skillsform;
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
        this.skillsservice.saveSkills(userdata).subscribe(data=>{
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
   getOneSkills(){
     this.currentUser = JSON.parse(sessionStorage.getItem('token'));
      var userdata = {
        user_id : this.currentUser.id,
        token : this.currentUser.token
      }
      this.skillsservice.getSkills(userdata).subscribe(data=>{
        if(data.response == "data not exist"){
          this.addFormArray();
        }else{
          if(data.data.skillsarray){
            JSON.parse(data.data.skillsarray).forEach(skills =>{
              this.t.push(this.formBuilder.group({
                skillname: [skills.skillname, Validators.required],
                skillsper: [skills.skillsper, Validators.required]
              }));
            })
          }
        }
      },(err)=>{

      })
   }


}
