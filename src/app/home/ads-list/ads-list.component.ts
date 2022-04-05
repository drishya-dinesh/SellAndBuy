import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss']
})
export class AdsListComponent implements OnInit {

  @Input() ads:any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
