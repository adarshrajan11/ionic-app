import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubmitOtpPage } from './submit-otp.page';

describe('SubmitOtpPage', () => {
  let component: SubmitOtpPage;
  let fixture: ComponentFixture<SubmitOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitOtpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
