import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanySwitchPage } from './company-switch.page';

describe('CompanySwitchPage', () => {
  let component: CompanySwitchPage;
  let fixture: ComponentFixture<CompanySwitchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySwitchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanySwitchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
