import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent{
  @Input() message: string = '';
  @Output() closeButton = new EventEmitter<boolean>();

  onClose(){
    this.closeButton.emit(false);
  }

  onDelete(){
    this.closeButton.emit(true);
  }

}
