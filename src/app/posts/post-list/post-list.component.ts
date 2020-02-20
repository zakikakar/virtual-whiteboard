import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { Post } from 'src/app/shared/post.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  list: Post[];
  constructor(private service : PostService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getPosts().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id, 
          ...item.payload.doc.data() as object  
        } as Post;
      })
    });
  }
  onEdit(post: Post){
    this.service.formData = Object.assign({}, post);
  }

  onDelete(id:string){
    if(confirm("Sikker på opslaget skal slettes?")) {
      this.firestore.doc('posts/' + id).delete();
      this.toastr.warning('Opslag slettet', 'Whiteboard');
    }
  }
}
