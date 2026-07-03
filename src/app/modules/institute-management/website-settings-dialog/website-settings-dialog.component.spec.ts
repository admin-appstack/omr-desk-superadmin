import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSettingsDialog } from './website-settings-dialog.component';

describe('WebsiteSettingsDialog', () => {
  let component: WebsiteSettingsDialog;
  let fixture: ComponentFixture<WebsiteSettingsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteSettingsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(WebsiteSettingsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
