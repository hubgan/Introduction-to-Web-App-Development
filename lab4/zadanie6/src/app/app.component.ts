import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'zadanie6';
  message: String = '';

  setMessage(msg: String): void {
    if (msg == 'the basics') {
      this.message = 'The basics Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam tempore qui voluptatum rerum odio, quis possimus pariatur deserunt, repellendus consequatur magnam sed fuga. A nisi architecto earum commodi nulla veritatis!';
    }
    else if (msg == 'components') {
      this.message = 'Components Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam tempore qui voluptatum rerum odio, quis possimus pariatur deserunt, repellendus consequatur magnam sed fuga. A nisi architecto earum commodi nulla veritatis!';
    }
    else {
      this.message = 'Event Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam tempore qui voluptatum rerum odio, quis possimus pariatur deserunt, repellendus consequatur magnam sed fuga. A nisi architecto earum commodi nulla veritatis!';
    }
  }
}
