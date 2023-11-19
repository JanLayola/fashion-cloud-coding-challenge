import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-widget',
  templateUrl: './dropdown-widget.component.html',
  styleUrls: ['./dropdown-widget.component.less']
})
export class DropdownWidgetComponent {
  @Input() items: any[] = [];
  @Input() selectedItem: string = '';
  @Input() label: string = '';

  @Output() selectItemEvent: EventEmitter<string> = new EventEmitter();

  selectItem(selectedItemValue: string): void {
    this.selectItemEvent.emit(selectedItemValue)
  }
}
