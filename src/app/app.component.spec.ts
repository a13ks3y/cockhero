import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  afterAll(() => {
    fixture.nativeElement.style.visibility = 'hidden';
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });
  let fixture;
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'CockHero'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('CockHero');
  });
  it('should render menu', () => {
    expect(fixture.nativeElement.querySelector('app-nav')).toBeTruthy();
  });
  it('should render burger button', () => {
    expect(fixture.nativeElement.querySelector('a.burger')).toBeTruthy();
  });
});
