import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioeditComponent } from './usuarioedit.component';

describe('UsuarioeditComponent', () => {
  let component: UsuarioeditComponent;
  let fixture: ComponentFixture<UsuarioeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
