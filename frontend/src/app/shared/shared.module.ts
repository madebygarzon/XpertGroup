import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoaderComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    LoaderComponent,
    CarouselComponent
  ]
})
export class SharedModule {}
