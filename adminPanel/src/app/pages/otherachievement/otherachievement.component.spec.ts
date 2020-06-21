import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherachievementComponent } from './otherachievement.component';

describe('OtherachievementComponent', () => {
  let component: OtherachievementComponent;
  let fixture: ComponentFixture<OtherachievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherachievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherachievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
