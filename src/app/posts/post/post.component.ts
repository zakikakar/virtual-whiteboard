import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public service : PostService,
    private firestore:AngularFirestore,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm) {
    if(form!= null) 
    form.resetForm();
    this.service.formData = {
      id : null,
      fullName : "",
      text : "",
      link: "",
     /*  empCode : "",
      mobile : "", */

    }
  }

  onSubmit (form:NgForm){
    let data = Object.assign({}, form.value);
    delete data.id;
    if(form.value.id==null)
    this.firestore.collection('posts').add(data);
    else
    this.firestore.doc('posts/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Opslag tilføjet!', 'Whiteboard');
  }
}
