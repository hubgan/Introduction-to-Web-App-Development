import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { HttpserviceService } from 'src/app/service/httpservice.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any = [];
  form: FormGroup;

  constructor(private httpService: HttpserviceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.loadPosts();
  }

  initForm() {
    this.form = this.formBuilder.group({
      userId: [null, Validators.required],
      id: [null, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required]
    })
  }

  loadPosts() {
    return this.httpService.getPosts().subscribe((data: {}) => {
      this.posts = data;
      console.log(this.posts);
    })
  }

  onSubmit() {
    let post: Post = this.form.value;

    this.httpService.addPost(post).subscribe((data: {}) => {
      this.form.reset();
      this.posts.unshift(post);
      console.log("succesfull post request");
    }, (error) => {
      console.log(error);
    });
  }
}
