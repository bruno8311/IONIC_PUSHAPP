import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    Platform,
    OneSignal,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
