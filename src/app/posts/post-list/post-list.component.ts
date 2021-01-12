import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { remove } from "lodash";

import { Post } from "../post.model";
import { PostService } from "../post.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  body: string;
  title: string;
  userId: number;
  id: number;
  imagePath: string;

  result: Post[];
  postSubscription: Subscription;
  isLoading: boolean = false;
  isForm: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSubscription = this.postService
      .getPostUpdateListner()
      .subscribe((data: { posts: Post[] }) => {
        this.isLoading = false;
        this.posts = data.posts.slice(0, 8);
      });
  }

  //*******************adding new  form data */
  onAdd() {
    this.isForm = true;
  }

  //**********clicking on get details */
  onClick(id) {
    this.isForm = false;
    const result = this.posts.filter((item) => item.id == id);
    this.result = result;
    this.body = result[0].body;
    this.title = result[0].title;
    this.userId = result[0].userId;
    this.id = result[0].id;
    this.imagePath = result[0].imagePath;
  }
  //***********************delete handler */

  onDelete(id) {
    const removeItem = remove(this.posts, (item) => {
      return item.id === id;
    });
    this.title = null;
    this.body = null;
    this.userId = null;
    this.id = null;
    this.posts = [...this.posts];
  }
}
