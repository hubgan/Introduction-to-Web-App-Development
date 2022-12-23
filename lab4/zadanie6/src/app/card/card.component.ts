import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() heading: String = '';
  @Input() info: String = '';
  @Output() messageToShow = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  handleOnClick() {
    this.messageToShow.emit(this.heading.toLowerCase());
  }

}
