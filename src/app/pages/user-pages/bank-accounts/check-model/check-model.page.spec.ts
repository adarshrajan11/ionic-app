import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckModelPage } from './check-model.page';

describe('CheckModelPage', () => {
  let component: CheckModelPage;
  let fixture: ComponentFixture<CheckModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
