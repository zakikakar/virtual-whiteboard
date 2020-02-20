import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  formData : Post;

  constructor(private firestore: AngularFirestore) { }
  
  getPosts(){
    return this.firestore.collection('posts').snapshotChanges();
  }
}
