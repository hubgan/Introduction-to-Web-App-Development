import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {
  @Input() downloadURL: string;
  @Output() URL: EventEmitter<string> = new EventEmitter();
  metaData: any;

  error: boolean = false;
  isLoading: boolean = false;
  errorMessage: string;

  constructor(private storageService: FileUploadService) { }

  ngOnInit(): void {
    this.error = false;
    this.isLoading = true;
    this.errorMessage = '';

    this.storageService.getStorage().refFromURL(this.downloadURL).getMetadata().subscribe((data) => {
      this.metaData = data;
      this.error = false;
      this.isLoading = false;
    }, (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoading = false;
    })
  }

  deleteFile() {
    this.URL.emit(this.downloadURL);
  }
}
