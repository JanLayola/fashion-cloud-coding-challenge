import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.less']
})
export class ButtonWidgetComponent {
  @Input() label: string = '';
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  makeAction(): void {
    this.onClick.emit();
  }
}
