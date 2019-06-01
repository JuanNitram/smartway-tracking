import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  params = {
    vehicles: 33,
    datetime_from: '2019-05-01T18:00',
    datetime_to: '2019-05-03T03:00'
  }

  constructor() { }

  ngOnInit() {
  }

  submit(){
    this.eventEmitter.emit(this.params);
  }
}
