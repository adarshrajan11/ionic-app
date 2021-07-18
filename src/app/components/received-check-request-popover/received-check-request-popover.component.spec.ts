import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceivedCheckRequestPopoverComponent } from './received-check-request-popover.component';

describe('ReceivedCheckRequestPopoverComponent', () => {
  let component: ReceivedCheckRequestPopoverComponent;
  let fixture: ComponentFixture<ReceivedCheckRequestPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedCheckRequestPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedCheckRequestPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
