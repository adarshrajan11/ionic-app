import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckRequestPage } from './check-request.page';

describe('CheckRequestPage', () => {
  let component: CheckRequestPage;
  let fixture: ComponentFixture<CheckRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
