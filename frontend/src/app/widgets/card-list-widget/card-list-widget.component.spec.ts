import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListWidgetComponent } from './card-list-widget.component';

describe('CardListWidgetComponent', () => {
  let component: CardListWidgetComponent;
  let fixture: ComponentFixture<CardListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
