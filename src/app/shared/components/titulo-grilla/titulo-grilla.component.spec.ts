import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloGrillaComponent } from './titulo-grilla.component';

describe('TituloGrillaComponent', () => {
  let component: TituloGrillaComponent;
  let fixture: ComponentFixture<TituloGrillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TituloGrillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TituloGrillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
