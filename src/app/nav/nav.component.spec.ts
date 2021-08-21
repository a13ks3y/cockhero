import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  afterAll(() => {
    fixture.nativeElement.style.visibility = 'hidden';
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be hidden by default', () => {
    expect(component.hidden).toBeTrue();
  });
  it('should has class hidden', () => {
    expect(fixture
      .nativeElement
      .querySelector('header')
      .classList.contains('hidden')
    ).toBeTrue();
  });
  it('should toggle hidden property', () => {
    expect(component.hidden).toBeTrue();
    component.toggleHidden();
    expect(component.hidden).toBeFalse();
  });
});
