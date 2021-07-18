import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserVerificationPhonePage } from './user-verification-phone.page';

describe('UserVerificationPhonePage', () => {
  let component: UserVerificationPhonePage;
  let fixture: ComponentFixture<UserVerificationPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVerificationPhonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserVerificationPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
