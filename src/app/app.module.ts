import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MqttModule } from 'ngx-mqtt';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MqttModule.forRoot({ connectOnCreate: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
