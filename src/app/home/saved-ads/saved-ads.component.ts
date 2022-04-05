import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-ads',
  templateUrl: './saved-ads.component.html',
  styleUrls: ['./saved-ads.component.scss']
})
export class SavedAdsComponent implements OnInit {

  savedAds = [
    {
      name: 'Product Name',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample'
    },
    {
      name: 'Product Name',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample'
    },
    {
      name: 'Product Name',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
