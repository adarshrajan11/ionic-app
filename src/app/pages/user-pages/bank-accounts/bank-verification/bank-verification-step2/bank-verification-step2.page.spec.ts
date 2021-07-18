import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BankVerificationStep2Page } from './bank-verification-step2.page';

describe('BankVerificationStep2Page', () => {
  let component: BankVerificationStep2Page;
  let fixture: ComponentFixture<BankVerificationStep2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankVerificationStep2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankVerificationStep2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
