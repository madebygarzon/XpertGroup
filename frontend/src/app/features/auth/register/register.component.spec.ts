import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { AuthHttpService } from '../../../core/services/auth-http.service';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthHttpService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthHttpService', ['register']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthHttpService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthHttpService) as jasmine.SpyObj<AuthHttpService>;
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when passwords do not match', () => {
    component.email = 'test@example.com';
    component.password = 'password123';
    component.confirmPassword = 'different';
    component.firstName = 'John';
    component.lastName = 'Doe';

    component.onSubmit();

    expect(component.error).toBe('Passwords do not match');
  });

  it('should call register service when form is valid', () => {
    component.email = 'test@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.firstName = 'John';
    component.lastName = 'Doe';

    authService.register.and.returnValue(of({
      user: { id: '1', email: 'test@example.com', firstName: 'John', lastName: 'Doe' },
      token: 'fake-token'
    }));

    component.onSubmit();

    expect(authService.register).toHaveBeenCalled();
  });
});
