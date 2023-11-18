import {Component, Input} from '@angular/core';

export interface ICardProperties {
  title: string,
  image: string,
  subtitle: string,
  rightInfo: string
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['card.component.less']
})
export default class CardComponent {
  @Input() item: ICardProperties = {title: '', image: '', subtitle: '', rightInfo: ''};
}
