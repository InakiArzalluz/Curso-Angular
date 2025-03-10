import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UsersComponent } from '../users/users.component';
import { UserComponent } from '../users/user/user.component';
import { ServersComponent } from '../servers/servers.component';
import { ServerComponent } from '../servers/server/server.component';
import { EditServerComponent } from '../servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuardService } from '../auth-guard.service';
import { CanDeactivateGuard } from '../servers/edit-server/can-deactivate.service';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { ServerResolver } from '../servers/server/server-resolver.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent}, // localhost:4200/
  { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }, // ":" hace que sea dinamico y se pueda obtener el valor de id
  ] }, // localhost:4200/users
  { path: 'servers', 
    //canActivate: [ AuthGuardService ] , //Esto bloquea toda la ruta
    canActivateChild: [AuthGuardService], // Esto solo bloquea la hijas. (AuthGuardService debe implementar interfaz CanActivateChild)
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      { path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  }, // localhost:4200/servers
  //{ path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'} },
  { path: '**', redirectTo:'/not-found'},
  
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //RouterModule.forRoot(appRoutes, {useHash: true}),
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule, // para poder usar las rutas desde fuera de este modulo
  ],
})
export class AppRoutingModule {
  
}
