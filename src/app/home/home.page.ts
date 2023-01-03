import { PushService } from './../services/push.service';
import { ApplicationRef, Component, OnInit } from '@angular/core';
PushService
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mensajes:any[] = []

  constructor(public pushService: PushService, private applicacionRef: ApplicationRef) {

  }

  ngOnInit(){
    this.pushService.pushListener.subscribe( data=>{

      this.mensajes.unshift(data);
      this.applicacionRef.tick(); //LE DICE A ANGULAR QUE HAGA EL CICLO DE DETECCION NUEVANTE, VERIFICANDO QUE SE HAYA INSERTADO LA NOTIFICAICON EN EL ARRGELO
    }
    )
  }

  async ionViewWillEnter(){
    console.log('Will enter cargar mensajes: ')
    this.mensajes = await this.pushService.getMensajes();
  }

  async borrarMensajes(){
    await this.pushService.borrarRegistroStorage();
    this.mensajes=[];
  }
}
