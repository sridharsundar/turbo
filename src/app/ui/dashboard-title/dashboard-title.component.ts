import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dashboard-title',
  templateUrl: './dashboard-title.component.html',
  styleUrls: ['./dashboard-title.component.scss']
})
export class DashboardTitleComponent implements OnInit {

  @Input()
  title;
  @Input()
  icon;

  constructor() { }

  ngOnInit() {
  }

}
