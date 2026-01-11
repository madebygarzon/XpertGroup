import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { AuthHttpService } from '../../core/services/auth-http.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: jasmine.SpyObj<AuthHttpService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthHttpService', [
      'getCurrentUser',
      'logout'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthHttpService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthHttpService) as jasmine.SpyObj<AuthHttpService>;
    authService.getCurrentUser.and.returnValue({
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe'
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current user on init', () => {
    expect(component.user).toBeTruthy();
    expect(component.user?.email).toBe('test@example.com');
  });

  it('should generate correct initials', () => {
    expect(component.initials).toBe('JD');
  });

  it('should logout user', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
