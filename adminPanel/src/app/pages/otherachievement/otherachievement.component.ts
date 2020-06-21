import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OtherAchievementService } from '../../services/otherachievement.service';

@Component({
  selector: 'app-otherachievement',
  templateUrl: './otherachievement.component.html',
  styleUrls: ['./otherachievement.component.scss']
})
export class OtherachievementComponent implements OnInit {
    dynamicForm: FormGroup;
    submitted = false;
    currentUser : any;
  constructor(private formBuilder: FormBuilder ,private toastr: ToastrService,
    private otherachievementservice:OtherAchievementService) { }

  ngOnInit() {
  	this.dynamicForm = this.formBuilder.group({
        otherachievement: new FormArray([])
    });
    this.getOneAchievement();
  }
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.otherachievement as FormArray; }
  	addFormArray() {
        this.t.push(this.formBuilder.group({
            title: ['', Validators.required],
            about: ['', Validators.required],
            yearmonth: ['', Validators.required],
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
      var insertArray =this.dynamicForm.value.otherachievement;
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
        this.otherachievementservice.saveAchievement(userdata).subscribe(data=>{
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
   getOneAchievement(){
     this.currentUser = JSON.parse(sessionStorage.getItem('token'));
      var userdata = {
        user_id : this.currentUser.id,
        token : this.currentUser.token
      }
      this.otherachievementservice.getAchievement(userdata).subscribe(data=>{
        if(data.response == "data not exist"){
          this.addFormArray();
        }else{
          if(data.data.achievementarray){
            JSON.parse(data.data.achievementarray).forEach(achievement =>{
              this.t.push(this.formBuilder.group({
                 title: [achievement.title, Validators.required],
                  about: [achievement.about, Validators.required],
                  yearmonth: [achievement.yearmonth, Validators.required],
              }));
            })
          }
        }
      },(err)=>{

      })
   }


}
