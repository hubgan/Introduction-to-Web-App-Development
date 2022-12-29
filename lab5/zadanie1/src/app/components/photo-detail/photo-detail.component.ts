import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/models/photo';
import { HttpserviceService } from 'src/app/service/httpservice.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  photoId: number;
  photo: Photo = {
    albumId: -1,
    id: -1,
    title: "",
    url: "",
    thumbnailUrl: ""
  }

  constructor(private route: ActivatedRoute, private httpService: HttpserviceService) { }

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params['id'];
    this.loadPhoto();
  }

  loadPhoto(): void {
    this.httpService.getPhoto(this.photoId).subscribe((data: Photo) => {
      this.photo = data;
      console.log(this.photo);
    })
  }

}
