import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedAdsComponent } from './saved-ads.component';

describe('SavedAdsComponent', () => {
  let component: SavedAdsComponent;
  let fixture: ComponentFixture<SavedAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
