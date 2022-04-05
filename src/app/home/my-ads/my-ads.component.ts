import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {

  myAds = [
    {
      name: 'Product Name',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'user'
    },
    {
      name: 'Product Name',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'user'
    },
    {
      name: 'Product Name',
      description: 'this product is in awesome condition',
      price: 320,
      image: '',
      location: 'Scarborough',
      date: 'Sat Apr 02 2022 00:00:00',
      category: 'sample',
      createdBy: 'user'
    }
  ]

  isVisible = false;

  postAd: any = {
    name: '',
    description: '',
    price: null,
    category: '',
    location: '',
    image: '',
    date: new Date(),
    createdBy: 'User'
  }

  categoryList = [
    "Mobiles",
    "Furniture",
    "Camera",
    "Other"
  ]

  locationList = [
    "Scarborough",
    "Downtown",
    "Markham",
    "Ontario",
    "Other"
  ]

  selectedImage = null;

  constructor() { }

  ngOnInit(): void {
  }

  openPostAd() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.myAds.push(this.postAd)
    this.isVisible = false;
  }

  onImageSelect(event: any) {
    this.handleFileSelect(event)
  }


  handleFileSelect(event: any) {
    let me = this;
    let file = event.target.files[0];
    if (file.size / 1024 <= 512) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        me.postAd.image = String(reader.result)
      };
      reader.onerror = function (error) {
        alert('file error');
      };
    } else {
      alert('file size error');
      this.selectedImage = null;
    }
  }

  get isFormInvalid() {
    return !this.postAd.name ||
      !this.postAd.description ||
      !this.postAd.price ||
      !this.postAd.image ||
      !this.postAd.location ||
      !this.postAd.category
  }

}
