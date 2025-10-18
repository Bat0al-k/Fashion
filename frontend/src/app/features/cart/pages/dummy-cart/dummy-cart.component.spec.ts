import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyCartComponent } from './dummy-cart.component';

describe('DummyCartComponent', () => {
  let component: DummyCartComponent;
  let fixture: ComponentFixture<DummyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DummyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
