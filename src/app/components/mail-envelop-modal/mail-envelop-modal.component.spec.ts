import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailEnvelopModalComponent } from './mail-envelop-modal.component';

describe('MailEnvelopModalComponent', () => {
  let component: MailEnvelopModalComponent;
  let fixture: ComponentFixture<MailEnvelopModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailEnvelopModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailEnvelopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
