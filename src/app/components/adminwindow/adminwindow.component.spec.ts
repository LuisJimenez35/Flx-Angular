// adminwindow.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminwindowComponent } from './adminwindow.component';

describe('AdminwindowComponent', () => {
  let component: AdminwindowComponent;
  let fixture: ComponentFixture<AdminwindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminwindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
