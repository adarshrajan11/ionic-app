import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayeeListPage } from './payee-list.page';

describe('PayeeListPage', () => {
  let component: PayeeListPage;
  let fixture: ComponentFixture<PayeeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayeeListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayeeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
