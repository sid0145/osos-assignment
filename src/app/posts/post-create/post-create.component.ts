import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  addForm: FormGroup;
  imagePreview: string;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit() {
    this.initForm();
  }

  //*************form init */
  initForm() {
    this.addForm = this.fb.group({
      title: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[a-zA-Z]*$/),
        ],
      ],
      userId: [null, Validators.required],
      body: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }

    const data = {
      id: Math.floor(Math.random() * 1000),
      title: this.addForm.value.title,
      body: this.addForm.value.body,
      userId: this.addForm.value.userId,
      imagePath: this.addForm.value.imagePath,
    };

    this.postService.onAddData(data);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log(this.imagePreview);
      this.addForm.patchValue({ imagePath: this.imagePreview });
    };
    reader.readAsDataURL(file);
  }
}
