import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecenzijaComponent } from './create-recenzija.component';

describe('CreateRecenzijaComponent', () => {
  let component: CreateRecenzijaComponent;
  let fixture: ComponentFixture<CreateRecenzijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRecenzijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecenzijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
