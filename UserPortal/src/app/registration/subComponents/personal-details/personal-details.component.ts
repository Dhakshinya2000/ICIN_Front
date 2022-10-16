import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators,FormBuilder, Form}  from "@angular/forms"

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  constructor(private router : Router, private formbuilder:FormBuilder) { }
  firstName:string;
  lastName:string;
  invalidFirstName = false;
  invalidLasttName = false;
  contactForm : FormGroup;
  submitted = false;
  age:number;
  kycForm:FormGroup;
  invalidPan:any;
  invalidAge = false;


  ngOnInit(): void {
    this.contactForm = this.formbuilder.group({
      email : ["",[Validators.required,Validators.email]],
      phone: ["", [Validators.required, Validators.minLength(10),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    })
  }


  handlePersonalDetailsValidation(){
    if(this.firstName===undefined){
      this.invalidFirstName = true;
    }
    if(this.lastName===undefined){
      this.invalidLasttName = true;
    }
    else {
    sessionStorage.setItem("firstName",this.firstName);
    sessionStorage.setItem("lastName",this.lastName);
    }
  }

  validateContactDetails(){
    
    if(this.contactForm.valid )
    {   sessionStorage.setItem("phonenumber",this.contactForm.get("phone").value);
        sessionStorage.setItem("mailid",this.contactForm.get("email").value);
        this.router.navigate(["register","kycDetails"]);
     }
  }

  

  get f() { return this.contactForm.controls; }

  validateKyc(){
    console.log(this.kycForm.get("dob").value);
    let currentDate:any =  new Date(this.kycForm.get("dob").value);
    let timeDiff =  Math.abs(Date.now() - currentDate)
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    console.log(this.age);
    if(this.age<10){
      this.invalidAge = true;
      return;
    }
    if(!this.checkPancardValidity(this.kycForm.get("pan").value)){
      this.invalidPan = true;
      return;
    }
    

    if(!this.kycForm.invalid)
       this.router.navigate(["register","addressDetails"])
  }

  checkPancardValidity(pan) {
    let letter = /[a-zA-Z]/; 
    let number = /[0-9]/;
    let valid = number.test(pan) && letter.test(pan);
    console.log(valid);
    return valid;
}

}
