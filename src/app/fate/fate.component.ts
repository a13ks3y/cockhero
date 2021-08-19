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
    this.sizeChanged(window.screen.availWidth, window.screen.availHeight);
  }
  // @todo: call this method when window size changed (how?)
  sizeChanged(width: number, height: number): void {
    // @todo: use actual sizes!
    const videoRect = [
      {width: 2048, height: 1080},
      {width: 1080, height: 1024},
      {width: 1024, height: 769},
      {width: 840, height: 520},
      {width: 640, height: 480},
      {width: 420, height: 260},
    ].find(rect => rect.width <= (width / 2) && rect.height <= (height / 2));
    const columnsCount = Math.floor(width / videoRect.width);
    const rowsCount = Math.floor(height / videoRect.height);
    this.videos = Array(columnsCount * rowsCount).fill(new Video());
  }
}
