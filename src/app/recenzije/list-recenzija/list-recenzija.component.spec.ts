import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecenzijaComponent } from './list-recenzija.component';

describe('ListRecenzijaComponent', () => {
  let component: ListRecenzijaComponent;
  let fixture: ComponentFixture<ListRecenzijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListRecenzijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRecenzijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
