import { Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Injectable({
  providedIn: 'root'
})
export class PlayHistoryService {

  constructor(headerComponent: HeaderComponent) { 

  }
}
