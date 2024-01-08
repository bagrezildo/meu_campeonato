import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraTimeComponent } from './registra-time.component';

describe('RegistraTimeComponent', () => {
  let component: RegistraTimeComponent;
  let fixture: ComponentFixture<RegistraTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistraTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistraTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
