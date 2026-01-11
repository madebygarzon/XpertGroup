import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BreedRepository } from './repositories/breed.repository';
import { ImageRepository } from './repositories/image.repository';
import { AuthRepository } from './repositories/auth.repository';
import { BreedHttpService } from './services/breed-http.service';
import { ImageHttpService } from './services/image-http.service';
import { AuthHttpService } from './services/auth-http.service';

@NgModule({
  providers: [
    { provide: BreedRepository, useClass: BreedHttpService },
    { provide: ImageRepository, useClass: ImageHttpService },
    { provide: AuthRepository, useClass: AuthHttpService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
