import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  actutalMessage: String = '';
  @Output() message = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  setMessage(message: String): void {
    this.actutalMessage = message;
    this.message.emit(this.actutalMessage);
  }

}
