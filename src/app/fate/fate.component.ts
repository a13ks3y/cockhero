import {Component, OnInit} from '@angular/core';
import {Video} from "./video";

@Component({
  selector: 'app-fate',
  templateUrl: './fate.component.html',
  styleUrls: ['./fate.component.less']
})
export class FateComponent implements OnInit {
  videos: Video[] = [];

  constructor() {}

  ngOnInit(): void {
  }
  // @todo: call this method when window size changed (how?)
  sizeChanged(width: number, height: number): void {
    const columnsCount = Math.floor(width / 420);
    const rowsCount = Math.floor(height / 260);
    this.videos = Array(columnsCount * rowsCount).fill(new Video());
  }
}
