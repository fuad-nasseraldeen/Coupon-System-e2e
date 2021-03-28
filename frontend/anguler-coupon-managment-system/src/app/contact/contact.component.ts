import { Component, OnInit } from '@angular/core';
import * as M from 'src/app/models/app.models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  formDetails: M.Contact;
  showSpinner : boolean = false ;
  inboundClick : boolean = true;
  outboundClick : boolean = true;


  constructor(private router : Router , private contactServise : ContactService , private dataService : DataService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formDetails = {
      contactId:null,
      contactName : null,
      contactEmail : null,
      subject : null,
      message : null
    }
  }

  submit() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
     this.contactServise.saveMessage(this.formDetails).subscribe(
       (param) => {
        console.log(this.formDetails)
        console.log(param)
      Swal.fire('we will back you soon MR. ' +  this.formDetails.contactName  , 'success')
      this.router.navigate(['/home2']);
      console.log(param);
     } , 
     (err) =>  Swal.fire('there is an error!', 'Please try again ', 'error')
     )
     this.inboundClick = true;
     this.outboundClick = true;
    } , 2500 );
  }


}
