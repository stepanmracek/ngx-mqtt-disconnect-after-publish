import { Component } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { map, mergeMap, delay, concatMap } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private mqtt: MqttService) { }

  pipeablePublish(topic: string, message: any): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.mqtt.publish(topic, message).subscribe({
        complete: () => {
          observer.next(true);
          observer.complete();
        }, error: error => {
          observer.error(error);
        }
      });
    });
  }

  test() {
    this.mqtt.connect({
      hostname: 'localhost',
      port: 1884
    });

    this.mqtt.onConnect.pipe(
      concatMap(() => this.pipeablePublish('topic', 'first')),
      delay(1000),
      concatMap(() => this.pipeablePublish('topic', 'second')),
      // delay(1000), // uncomment this if you want to publish also the second message
    ).subscribe(() => {
      console.log('complete');
      this.mqtt.disconnect();
    });
  }
}
