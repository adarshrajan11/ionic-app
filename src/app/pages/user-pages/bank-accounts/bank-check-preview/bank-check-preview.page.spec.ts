import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BankCheckPreviewPage } from './bank-check-preview.page';

describe('BankCheckPreviewPage', () => {
  let component: BankCheckPreviewPage;
  let fixture: ComponentFixture<BankCheckPreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankCheckPreviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankCheckPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
