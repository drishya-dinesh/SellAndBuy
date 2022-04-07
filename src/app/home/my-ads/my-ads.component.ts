import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { COLLECTIONS } from '../app-constants';

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
    savedUsers: []
  };

  categoryList = ['Mobiles', 'Furniture', 'Camera', 'Other'];

  locationList = ['Scarborough', 'Downtown', 'Markham', 'Ontario', 'Other'];

  selectedImage = null;

  items: any

  userId: any;

  constructor(
    private fireBaseService: FireBaseService,
    private message: NzMessageService
  ) {

  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.fireBaseService.fetchMyAds(COLLECTIONS.ALL_ADS, this.userId).subscribe((val: any) => {
      this.myAds = val;
    })
  }

  openPostAd() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.postAd.userId = this.userId;
    this.fireBaseService.addToCollection(COLLECTIONS.ALL_ADS, this.postAd).then(() => {
      this.isVisible = false;
      this.message.create('success', 'Ad Posted Successfully');
      this.myAds.push(this.postAd);
    })
  }

  onImageSelect(event: any) {
    this.handleFileSelect(event);
  }

  handleFileSelect(event: any) {
    let me = this;
    let file = event.target.files[0];
    if (file.size / 1024 <= 2048) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        me.postAd.image = String(reader.result);
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
