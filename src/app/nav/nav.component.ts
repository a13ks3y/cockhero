import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  hidden = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleHidden(): void {
    this.hidden = !this.hidden;
  }
}
