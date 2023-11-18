import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformNavigationComponent } from './platform-navigation.component';

describe('PlatformNavigationComponent', () => {
  let component: PlatformNavigationComponent;
  let fixture: ComponentFixture<PlatformNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    const platformNavigationComponent = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(platformNavigationComponent.getElementsByClassName('.platform-navigation')).toBeTruthy()
  });
});
