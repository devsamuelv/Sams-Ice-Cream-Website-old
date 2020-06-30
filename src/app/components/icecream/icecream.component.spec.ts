import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcecreamComponent } from './icecream.component';

describe('IcecreamComponent', () => {
  let component: IcecreamComponent;
  let fixture: ComponentFixture<IcecreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcecreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcecreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
