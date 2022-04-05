import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  allAds = [
    {
      name: 'Product Name',
      id:'ea12',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'James Javid'
    },
    {
      name: 'Product Name',
      id:'ea12',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'James Javid'
    },
    {
      name: 'Product Name',
      id:'ea12',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'James Javid'
    }, {
      name: 'Product Name',
      id:'ea12',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'James Javid'
    }, {
      name: 'Product Name',
      id:'ea12',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'James Javid'
    },
    {
      name: 'Product Name',
      id:'ea12',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'James Javid'
    },
    {
      name: 'Product Name',
      id:'ea12',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'James Javid'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
