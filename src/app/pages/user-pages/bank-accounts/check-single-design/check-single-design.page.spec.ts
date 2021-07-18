import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckSingleDesignPage } from './check-single-design.page';

describe('CheckSingleDesignPage', () => {
  let component: CheckSingleDesignPage;
  let fixture: ComponentFixture<CheckSingleDesignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckSingleDesignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckSingleDesignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
