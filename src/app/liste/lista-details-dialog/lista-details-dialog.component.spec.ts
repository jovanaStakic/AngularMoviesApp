import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDetailsDialogComponent } from './lista-details-dialog.component';

describe('ListaDetailsDialogComponent', () => {
  let component: ListaDetailsDialogComponent;
  let fixture: ComponentFixture<ListaDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
