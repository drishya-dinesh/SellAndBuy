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
    image: [],
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
    'Antiques & Collectibles',
    'Arts and crafts',
    'Garage Sale',
    'Health & beauty',
    'Pet supplies',
    'Toys & Games',
    'vehicles',
    'Rentals',
    'clothin & shoes',
    'instruments',
    'jewellery',
    'Miscellaneous',
  ];

  locationList = [
    'Scarborough',
    'Downtown',
    'Markham',
    'Ontario',
    'pickering',
    'vaughan',
    'Miliken',
    'Richmond Hill',
    'Oshawa',
    'Uxbridge',
    'Peterborough',
    'Westwood',
    'Lakefield',
    'Barrie',
    'Missisauga',
    'Kitchener',
    'Hamilton',
    'London',
    'Brampton',
  ];

  selectedImage = null;

  items: any;

  userId: any;

  userName: any = '';

  postLoading = false;

  adsLoading = false;

  constructor(
    private fireBaseService: FireBaseService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('userName');
    this.adsLoading = true;
    this.fireBaseService
      .fetchMyAds(COLLECTIONS.ALL_ADS, this.userId)
      .subscribe((val: any) => {
        this.adsLoading = false;
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
      sellerId: '',
      sellerName: '',
      savedUsers: [],
    };
  }

  handleOk() {
    this.postAd.sellerId = this.userId;
    this.postAd.sellerName = this.userName;
    this.postLoading = true;
    this.fireBaseService.postAd(COLLECTIONS.ALL_ADS, this.postAd).then(() => {
      this.postLoading = false;
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
    if (
      Array.from(event.target.files).some((file: any) => file.size / 1024 > 512)
    ) {
      this.message.create('error', 'file size must be less than 512kb');
      this.selectedImage = null;
    } else {
      this.tobase64Handler(event.target.files).then((val: any) => {
        this.postAd.image = val;
      });
    }
  }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (error) => reject(error);
    });
  }

  async tobase64Handler(files: any) {
    const filePathsPromises: any = [];
    Array.from(files).forEach((file: any) => {
      filePathsPromises.push(this.toBase64(file));
    });
    const filePaths = await Promise.all(filePathsPromises);
    const mappedFiles = filePaths.map((base64File) => base64File);
    return mappedFiles;
  }

  refreshList() {
    this.ngOnInit();
  }

  get isFormInvalid() {
    return (
      !this.postAd.name ||
      !this.postAd.description ||
      !this.postAd.price ||
      !this.postAd.image.length ||
      !this.postAd.location ||
      !this.postAd.category
    );
  }
}
