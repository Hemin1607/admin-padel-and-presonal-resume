import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryimageComponent } from './galleryimage.component';

describe('GalleryimageComponent', () => {
  let component: GalleryimageComponent;
  let fixture: ComponentFixture<GalleryimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
