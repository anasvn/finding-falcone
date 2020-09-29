import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a button', () => {
    fixture = TestBed.createComponent(HomeComponent);
    const comp = fixture.componentInstance;
    const de = fixture.debugElement.query(By.css('button'));
    const element = de.nativeElement;
    expect(element.textContent.trim()).toBe('Help King Shan find Al Falcone');

  });
});
