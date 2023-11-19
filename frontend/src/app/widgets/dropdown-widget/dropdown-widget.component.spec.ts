import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownWidgetComponent } from './dropdown-widget.component';
import { By } from '@angular/platform-browser';

describe('DropdownWidgetComponent', () => {
  let component: DropdownWidgetComponent;
  let fixture: ComponentFixture<DropdownWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownWidgetComponent],
    });

    fixture = TestBed.createComponent(DropdownWidgetComponent);
    component = fixture.componentInstance;

    component.items = ['Item 1', 'Item 2', 'Item 3'];
    component.selectedItem = 'Item 2';
    component.label = 'Label';

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label in the first disabled option', () => {
    const dropdownElement: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('select');
    const options: HTMLCollectionOf<HTMLOptionElement> = dropdownElement.options;

    expect(options.length).toBeGreaterThanOrEqual(1);
    expect(options[0].text).toBe('Label');
    expect(options[0].disabled).toBe(true);
  });

  it('should display dropdown items', () => {
    const dropdownElement: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('select');
    const options: HTMLCollectionOf<HTMLOptionElement> = dropdownElement.options;

    expect(options.length).toBe(5);
    expect(options[1].textContent).toContain('Item 1');
    expect(options[2].textContent).toContain('Item 2');
    expect(options[3].textContent).toContain('Item 3');
  });

  it('should display clear as last option', () => {
    const dropdownElement: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('select');
    const options: HTMLCollectionOf<HTMLOptionElement> = dropdownElement.options;

    expect(options.length).toBe(5);
    expect(options[4].textContent).toContain('Clear');
  });

  it('should emit selectItemEvent when an item is selected', () => {
    spyOn(component.selectItemEvent, 'emit');

    const selectedItemValue = 'Item 2';
    component.selectItem(selectedItemValue);

    expect(component.selectItemEvent.emit).toHaveBeenCalledWith(selectedItemValue);
  });
});
