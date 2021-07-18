import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BankVerificationPage } from './bank-verification.page';

describe('BankVerificationPage', () => {
  let component: BankVerificationPage;
  let fixture: ComponentFixture<BankVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
