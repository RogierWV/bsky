import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShortComponent } from './profile-short.component';

describe('ProfileShortComponent', () => {
  let component: ProfileShortComponent;
  let fixture: ComponentFixture<ProfileShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileShortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
