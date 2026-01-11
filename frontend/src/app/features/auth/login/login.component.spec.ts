import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthHttpService } from '../../../core/services/auth-http.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthHttpService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthHttpService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthHttpService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthHttpService) as jasmine.SpyObj<AuthHttpService>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when fields are empty', () => {
    component.email = '';
    component.password = '';
    component.onSubmit();
    expect(component.error).toBe('Please fill in all fields');
  });

  it('should call login service when form is valid', () => {
    component.email = 'test@example.com';
    component.password = 'password123';
    authService.login.and.returnValue(of({
      user: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User' },
      token: 'fake-token'
    }));

    component.onSubmit();

    expect(authService.login).toHaveBeenCalled();
  });
});
