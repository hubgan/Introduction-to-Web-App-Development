import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { HttpserviceService } from 'src/app/service/httpservice.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos: any = [];

  constructor(private httpService: HttpserviceService) { }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos() {
    return this.httpService.getPhotos().subscribe((data: {}) => {
      this.photos = data;
      console.log(this.photos);
      this.photos = this.photos.slice(0, 100);
      console.log(this.photos)
    })
  }

}
