import { Injectable } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngxSmartModalService: NgxSmartModalService) { }
}
