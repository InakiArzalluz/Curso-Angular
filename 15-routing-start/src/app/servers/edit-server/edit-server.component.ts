import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false; 

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute, // Inyecto la ruta activa
    private router: Router,
  ) { }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean{
    // Esto es llamado desde CanDeactivateGuard
    if (!this.allowEdit){
      return true;
    }

    if( (this.serverName !== this.server.name || this.serverStatus !== this.server.status) 
        && !this.changesSaved ){
      return confirm('Do you want to discard the changes?');
      } else {
        return true;
      }
  }

  ngOnInit() {
    // Obtengo los parametros y el fragment
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params.subscribe( (params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });

    this.route.queryParams.subscribe( (params: Params) => {
      this.allowEdit = params['allowEdit'] === '1';
    });
    this.route.fragment.subscribe();
    
    
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
