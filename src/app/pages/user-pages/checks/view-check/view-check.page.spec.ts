import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCheckPage } from './view-check.page';

describe('ViewCheckPage', () => {
  let component: ViewCheckPage;
  let fixture: ComponentFixture<ViewCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
