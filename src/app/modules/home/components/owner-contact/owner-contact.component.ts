import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'owner-contact',
  templateUrl: './owner-contact.component.html',
  styleUrls: ['./owner-contact.component.scss']
})
export class OwnerContactComponent implements OnInit {
  @Input()
  owner;
  
  constructor() { }

  ngOnInit() {
  }

}
