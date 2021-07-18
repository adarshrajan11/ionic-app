import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceivedCheckPage } from './received-check.page';

describe('ReceivedCheckPage', () => {
  let component: ReceivedCheckPage;
  let fixture: ComponentFixture<ReceivedCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedCheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
