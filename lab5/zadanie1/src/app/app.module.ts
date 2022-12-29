import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { PhotosComponent } from './components/photos/photos.component';
import { NavComponent } from './components/nav/nav.component';
import { PhotoComponent } from './components/photo/photo.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'photo-details/:id', component: PhotoDetailComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    PhotosComponent,
    NavComponent,
    PhotoComponent,
    PhotoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
