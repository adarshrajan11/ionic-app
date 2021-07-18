import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserVerificationPage } from './user-verification.page';

describe('UserVerificationPage', () => {
  let component: UserVerificationPage;
  let fixture: ComponentFixture<UserVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
