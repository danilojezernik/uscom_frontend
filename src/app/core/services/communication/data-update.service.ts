import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataUpdateService {
  private dataUpdated = new Subject<void>(); // Create a subject for data updates

  dataUpdated$ = this.dataUpdated.asObservable(); // Observable for data updates

  triggerDataUpdate() {
    this.dataUpdated.next();  // Trigger a data update by emitting a value
  }
}
