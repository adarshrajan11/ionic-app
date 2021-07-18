import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultiMailCheckPage } from './multi-mail-check.page';

describe('MultiMailCheckPage', () => {
  let component: MultiMailCheckPage;
  let fixture: ComponentFixture<MultiMailCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiMailCheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultiMailCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
