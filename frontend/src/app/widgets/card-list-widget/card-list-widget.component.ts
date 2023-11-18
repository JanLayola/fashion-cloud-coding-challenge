import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {share} from "rxjs";
import {ICardProperties} from "../../components/card/card.component";


@Component({
  selector: 'app-card-list-widget',
  templateUrl: './card-list-widget.component.html',
  styleUrls: ['./card-list-widget.component.less']
})
export class CardListWidgetComponent {
  @Input() items: ICardProperties[] = [];
  @Input() canShowMoreItems: boolean = false;
  @Input() itemsAreLoading: boolean = true;
  @Input() noItemText: string = '';
  @Input() noMoreItemText: string = '';

  @Output() showMoreDataEvent: EventEmitter<null> = new EventEmitter()


  showMoreItems() {
    this.showMoreDataEvent.emit()
  }

  protected readonly share = share;
}
