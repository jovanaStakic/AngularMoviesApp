import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListaComponent } from './search-lista.component';

describe('SearchListaComponent', () => {
  let component: SearchListaComponent;
  let fixture: ComponentFixture<SearchListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
