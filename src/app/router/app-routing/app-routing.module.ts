import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../datas/routes.data';

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }