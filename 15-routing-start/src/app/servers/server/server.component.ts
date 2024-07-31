import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server']; // llama al resolver asociado a server
      }
    );
    //const id = +this.route.snapshot.params['id'];
    //this.server = this.serversService.getServer(id);
    //this.route.params.subscribe(
    //  (params: Params) => this.server = this.serversService.getServer(+params['id'])
    //);
  }

  onEditServer() {
    // preserve pasa los parametros que tengo hasta acá (allowEdit en este caso)
    this.router.navigate( ['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'} );
  }

}
