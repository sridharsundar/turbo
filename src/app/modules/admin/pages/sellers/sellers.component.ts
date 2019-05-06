import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ProviderService, AuthService, NotificationService } from 'app/core';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent implements OnInit {
  sellers: any[] = [];
  title = 'Vendeurs(';

  constructor(
    private providerService: ProviderService,
    private modalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.providerService.getAll()
    .subscribe((sellers: any[]) => {
      this.sellers = sellers;
      this.title +=  sellers.length +')'
    });
  }

  new() { this.modalService.getModal('modalNewSeller').open(); }

  onNew(seller) { this.sellers.push(seller); }

  delete(seller) {
    this.providerService.delete(seller._id)
    .subscribe(
      (res: any) => {
        this.sellers.splice(this.sellers.indexOf(seller), 1);
      }
    );
  }

}
