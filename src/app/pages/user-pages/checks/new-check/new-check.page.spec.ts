import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCheckPage } from './new-check.page';

describe('NewCheckPage', () => {
  let component: NewCheckPage;
  let fixture: ComponentFixture<NewCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
