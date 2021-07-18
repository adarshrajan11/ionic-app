import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCheckEmailPage } from './new-check-email.page';

describe('NewCheckEmailPage', () => {
  let component: NewCheckEmailPage;
  let fixture: ComponentFixture<NewCheckEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCheckEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCheckEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
