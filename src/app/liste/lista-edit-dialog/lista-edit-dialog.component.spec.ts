import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEditDialogComponent } from './lista-edit-dialog.component';

describe('ListaEditDialogComponent', () => {
  let component: ListaEditDialogComponent;
  let fixture: ComponentFixture<ListaEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
