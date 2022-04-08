import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { COLLECTIONS } from '../app-constants';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss'],
})
export class MyAdsComponent implements OnInit {
  myAds: any = [];

  isVisible = false;

  postAd: any = {
    name: '',
    description: '',
    price: null,
    category: '',
    location: '',
    image: '',
    date: String(new Date()),
    sellerId: 'userId',
    sellerName: 'Name of seller',
    savedUsers: [],
  };

  categoryList = [
    'Mobiles',
    'Furniture',
    'Camera',
    'printer',
    'watch',
    'headset/Headphones',
    'PC/LapTop/Computers',
  ];

  locationList = [
    'Scarborough',
    'Downtown',
    'Markham',
    'Ontario',
    'pickering',
    'vaughan',
    'Other',
  ];

  selectedImage = null;

  items: any;

  userId: any;

  constructor(
    private fireBaseService: FireBaseService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.fireBaseService
      .fetchMyAds(COLLECTIONS.ALL_ADS, this.userId)
      .subscribe((val: any) => {
        this.myAds = val;
      });
  }

  openPostAd() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;

    this.postAd = {
      name: '',
      description: '',
      price: null,
      category: '',
      location: '',
      image: '',
      date: String(new Date()),
      sellerId: 'userId',
      sellerName: 'Name of seller',
      savedUsers: [],
    };
  }

  handleOk() {
    this.postAd.sellerId = this.userId;
    this.fireBaseService.postAd(COLLECTIONS.ALL_ADS, this.postAd).then(() => {
      this.isVisible = false;
      this.message.create('success', 'Ad Posted Successfully');
      this.myAds.push(this.postAd);
      this.postAd = {
        name: '',
        description: '',
        price: null,
        category: '',
        location: '',
        image: '',
        date: String(new Date()),
        sellerId: 'userId',
        sellerName: 'Name of seller',
        savedUsers: [],
      };
    });
  }

  onImageSelect(event: any) {
    this.handleFileSelect(event);
  }

  handleFileSelect(event: any) {
    let me = this;
    let file = event.target.files[0];
    if (file.size / 1024 <= 512) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        me.postAd.image = String(reader.result);
      };
      reader.onerror = function (error) {
        me.message.create('error', 'file error');
      };
    } else {
      this.message.create('error', 'file size must be less than 512kb');
      this.selectedImage = null;
    }
  }

  get isFormInvalid() {
    return (
      !this.postAd.name ||
      !this.postAd.description ||
      !this.postAd.price ||
      !this.postAd.image ||
      !this.postAd.location ||
      !this.postAd.category
    );
  }
}
