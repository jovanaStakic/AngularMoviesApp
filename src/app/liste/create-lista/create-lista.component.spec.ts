import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListaComponent } from './create-lista.component';

describe('CreateListaComponent', () => {
  let component: CreateListaComponent;
  let fixture: ComponentFixture<CreateListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
