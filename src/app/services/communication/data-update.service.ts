import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataUpdateService {
  private dataUpdated = new Subject<void>();

  dataUpdated$ = this.dataUpdated.asObservable();

  triggerDataUpdate() {
    this.dataUpdated.next();
  }
}
