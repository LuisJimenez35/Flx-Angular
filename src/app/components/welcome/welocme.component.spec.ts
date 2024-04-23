import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';

describe('HomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ WelcomeComponent ] // Fix: Pass the component type instead of an instance
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent); // Fix: Pass the component type instead of an instance
    component = fixture.componentInstance;
    fixture.detectChanges();
});

it('should create', () => {
    expect(component).toBeTruthy();
});
});
