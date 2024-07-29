import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
    // ActivatedRoute me permite conocer la ruta actual,
    // y con eso obtener el "id" de "localhost:4200/users/id"
  }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    }

    // Me suscribo como observador a la ruta, para enterarme de los cambios
    // Esto es util si la ruta cambia desde dentro de este mismo componente, 
    // porque ngOnInit no se va a ejecutar xq no vuelve a instanciar el componente.
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params.id;
        this.user.name = params.name;
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
