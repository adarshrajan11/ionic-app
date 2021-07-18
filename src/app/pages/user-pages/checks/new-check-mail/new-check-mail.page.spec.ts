import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCheckMailPage } from './new-check-mail.page';

describe('NewCheckMailPage', () => {
  let component: NewCheckMailPage;
  let fixture: ComponentFixture<NewCheckMailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCheckMailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCheckMailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
