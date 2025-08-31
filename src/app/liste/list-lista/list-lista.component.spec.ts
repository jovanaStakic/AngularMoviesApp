import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListListaComponent } from './list-lista.component';

describe('ListListaComponent', () => {
  let component: ListListaComponent;
  let fixture: ComponentFixture<ListListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
