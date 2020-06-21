import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
  loginFormGroup: FormGroup;
  submitted : any = false;
  invalidLogin : any =false;
  loginMsg : string;
  returnUrl: string;

  constructor(private _formBuilder: FormBuilder,
    private userservice : UserService,
    private route: ActivatedRoute,
    private router: Router) {
  		this.loginFormGroup = this._formBuilder.group({
	        email: ['',[Validators.email,Validators.required]],
	        password : ['',Validators.required]
	    });
    }

  ngOnInit() {
  	this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
  }
  get f() { return this.loginFormGroup.controls; }
  checkuser(event: Event) {

    this.submitted = true;
   	if (this.loginFormGroup.invalid) {
            return;
    }
    var jsonUser = {
        "email": this.loginFormGroup.get('email').value,
        "password" : this.loginFormGroup.get('password').value,
  	}
    this.userservice.checkuser(jsonUser).subscribe(data => {
        if(data.statuscode == 200){
          sessionStorage.setItem('token',JSON.stringify(data.response));
           this.router.navigate([this.returnUrl]);
        }else{
          this.invalidLogin = true;
          this.loginMsg = data.msg;
        }
    },(err)=>{
      this.invalidLogin = true;
      this.loginMsg = err.error.response;
    	//console.log("error",err.error.response)
    });
    
  }

}
