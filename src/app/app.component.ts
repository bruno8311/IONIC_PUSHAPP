
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { PushService } from './services/push.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(platform: Platform, public pushService: PushService) {
    platform.ready().then(() => {
      this.pushService.configuracionInicial();
    });
  }

// Call this function when your app starts
// OneSignalInit(): void {
//   // Uncomment to set OneSignal device logging to VERBOSE
//   // OneSignal.setLogLevel(6, 0);

//   // NOTE: Update the setAppId value below with your OneSignal AppId.
//   OneSignal.setAppId("4af8a389-b33f-4eff-8625-0843eab7538c");
//   OneSignal.setNotificationOpenedHandler(function(jsonData) {
//       console.log('MENSAJE ENVIADO: ',  jsonData);
//       console.log(jsonData)
//   });

//   // Prompts the user for notification permissions.
//   //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
//   OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
//       console.log("User accepted notifications: " + accepted);
//   });
// }
}
