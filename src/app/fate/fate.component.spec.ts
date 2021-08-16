import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FateComponent } from './fate.component';
import {Video} from "./video";

describe('FateComponent', () => {
  let component: FateComponent;
  let fixture: ComponentFixture<FateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should has a set of videos', () => {
    expect(component.videos).toBeInstanceOf(Array);
  });
  it('should update videos according to page size changes', () => {
    component.sizeChanged(1024, 768);
    expect(component.videos.length).toEqual(4);
    component.sizeChanged(640, 480);
    expect(component.videos.length).toEqual(1);
    component.sizeChanged(2048, 1024);
    expect(component.videos.length).toEqual(12);
  });
});
