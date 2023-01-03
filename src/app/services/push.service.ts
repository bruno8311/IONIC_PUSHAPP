import { Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import OSNotification from 'plugins/onesignal-cordova-plugin/dist/OSNotification';
import { Storage } from '@ionic/storage-angular';
import { EventEmitter } from '@angular/core';
import { OSNotificationPayload } from '@awesome-cordova-plugins/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  public noti: any;
  mensajes : any[] = [
    // {
    //   title: 'Titulo de la push',
    //   body: 'Este es el body de la push',
    //   fecha: new Date(),
    // }
  ]

  deviceState: any;
  pushListener = new EventEmitter<any>();

  constructor(private _storage: Storage) {
    this.initStorage();
    this.cargarMensajes();
   }

  async initStorage() {
    await this._storage.create();
  }

  //METODO DE CARGA ININCIAL EN EL APPCOMPONENT
  configuracionInicial(){
  OneSignal.setAppId("4af8a389-b33f-4eff-8625-0843eab7538c");

    //NOTIFICACION ABIERTA
    OneSignal.setNotificationOpenedHandler(async (jsonData)=> {
         console.log('NOTIFICAICON ABIERTA: ',  jsonData.notification);
         await this.guardarRegistro(jsonData.notification)
    });

    //NOTIFICACION RECIBIDA
   this.noti = OneSignal.setNotificationWillShowInForegroundHandler((jsonData: any)=>{
      console.log('NOTIFICAICON RECIBIDA');
      this.guardarRegistro(jsonData);
    })

    //OBTENER ID DE SUSCRIPTOR;
    OneSignal.getDeviceState((data)=>{
      this.deviceState=data.userId
      console.log(this.deviceState)
    })
  }

  //METODO DE NOTIFICAICONES RECIBIDAS

  async guardarRegistro(data:  any){
    await this.cargarMensajes();   //CARGAR LOS MENSAJES DEL STORAGE

    const payload = data;
    const existeDuplicado = this.mensajes.find(mensaje =>
      mensaje.notificationId === payload.notificationId );

      if(existeDuplicado){  //GARANTIZAMOS QUE NO SE AGRGEGE UN DUPLICADO
        return;
      }

      this.mensajes.unshift(payload); // Agrega el mensaje en el arreglo
      this.pushListener.emit(payload); // Dispara un evento con el mensaje (para mostrarlo en la app)
    await  this.guardarRegistroStorage(); //Se guarda el registro en el Storage
  }

  guardarRegistroStorage(){
    this._storage.set('mensajes',this.mensajes);
  }
   borrarRegistroStorage(){
     this._storage.remove('mensajes');
  }

  async cargarMensajes(){
    this.mensajes = await this._storage.get('mensajes') || [];
    return this.mensajes
  }

  async getMensajes(){
    await this.cargarMensajes();
    return [...this.mensajes];
  }
}
