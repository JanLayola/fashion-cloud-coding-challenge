import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonWidgetComponent } from './button-widget.component';

describe('ButtonWidgetComponent', () => {
  let component: ButtonWidgetComponent;
  let fixture: ComponentFixture<ButtonWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonWidgetComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit onClick when makeAction is called', () => {
    spyOn(component.onClick, 'emit');

    component.makeAction();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should display the label correctly', () => {
    const label: string = 'This is a label';

    component.label = label;
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#buttonWidget');
    expect(buttonElement.textContent).toContain(label);
  });
});
