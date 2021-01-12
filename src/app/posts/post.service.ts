import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { Post } from "./post.model";

const URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class PostService {
  posts: Post[] = [];

  private postUpdated = new Subject<{ posts: Post[] }>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get(`${URL}`).subscribe((data: [Post]) => {
      this.posts = data.slice(0, 8);
      this.postUpdated.next({
        posts: [...this.posts],
      });
    });
  }

  getPostUpdateListner() {
    return this.postUpdated.asObservable();
  }

  //***************delete handler */
  deletePost(id: number) {
    console.log(id);
  }

  //****************add form */
  onAddData(data: Post) {
    console.log(data);
    this.posts.unshift(data);
    console.log(this.posts);
    this.postUpdated.next({
      posts: [...this.posts.slice(0, 8)],
    });
  }
}
