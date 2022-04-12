import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { COLLECTIONS } from '../app-constants';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss'],
})
export class AdsListComponent implements OnInit {
  @Input() ads: any = [];

  @Input() loading: any = false;
  isVisible = false;
  selectedImage = null;
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
  postLoading = false;

  @Input() searchText: any = false;

  @Output() refreshAdList: EventEmitter<any> = new EventEmitter<any>();

  userId: any = '';

  userName: any = '';

  showAdDetails = false;

  selectedAd: any;

  saveLoading = false;

  showDelete = false;
  adLoading = false;

  deleteLoading = false;

  imageIndex = 0;

  constructor(
    private fireBaseService: FireBaseService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
  }
  updateAdClick(ad: any) {
    this.isVisible = true;
    this.postAd = {...ad};
  }
  openAdDetails(ad: any) {
    this.selectedAd = ad;
    this.imageIndex = 0;
    this.showAdDetails = true;
  }

  handleOk() {
    this.postLoading = true;
    const id = this.selectedAd.id;
    this.fireBaseService.updateAd(COLLECTIONS.ALL_ADS,id, this.postAd ).then(()=>{
      this.message.create('success', 'Ad Updated Successfully');
      this.isVisible = false;
      this.selectedAd = {...this.postAd}
    }).catch(()=>{
      this.message.create('error', 'Couldn\'t update ad.');
    }).finally(()=>{
      this.postLoading = false;
    })
  }

  closeAdDetails() {
    this.showAdDetails = false;
  }

  saveAd(ad: any) {
    let savedUsers = ad.savedUsers;
    if (ad.savedUsers.includes(this.userId)) {
      savedUsers = savedUsers.filter((x: any) => x !== this.userId);
      ad.savedUsers = savedUsers;
    } else {
      savedUsers.push(this.userId);
      ad.savedUsers.push(this.userId);
    }
    this.saveLoading = true;
    this.fireBaseService
      .saveAd(COLLECTIONS.ALL_ADS, ad.id, savedUsers)
      .then(() => {
        this.saveLoading = false;
        this.message.create('success', 'Ad Saved Successfully');
      })
      .finally(() => {
        this.saveLoading = false;
      });
  }

  deleteAdClick() {
    this.showDelete = true;
  }

  confirmDelete() {
    this.deleteLoading = true;
    this.fireBaseService
      .deleteAd(COLLECTIONS.ALL_ADS, this.selectedAd.id)
      .then(() => {
        this.deleteLoading = false;
        this.message.create('success', 'Ad Deleted Successfully');
        this.selectedAd = undefined;
        this.showDelete = false;
        this.showAdDetails = false;
        this.refreshAdList.emit();
      })
      .catch(() => {
        this.deleteLoading = false;
        this.message.create('error', "Couldn't delete Ad. !");
      });
  }

  cancelDelete() {
    this.showDelete = false;
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
  async tobase64Handler(files: any) {
    const filePathsPromises: any = [];
    Array.from(files).forEach((file: any) => {
      filePathsPromises.push(this.toBase64(file));
    });
    const filePaths = await Promise.all(filePathsPromises);
    const mappedFiles = filePaths.map((base64File) => base64File);
    return mappedFiles;
  }
  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (error) => reject(error);
    });
  }

  navigateLeft() {
    if (this.imageIndex === 0) {
      this.imageIndex = this.selectedAd.image.length - 1;
    } else {
      this.imageIndex -= 1;
    }
  }
  navigateRight() {
    if (this.imageIndex === this.selectedAd.image.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex += 1;
    }
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

  onMessageClick() {
    this.fireBaseService
      .checkChatExists(COLLECTIONS.CHATS, this.selectedAd, this.userId)
      .subscribe((val: any) => {
        if (val.length > 0) {
          this.message.create('success', 'Continue to chat');
          sessionStorage.setItem('selectedChatId', val[0].adId);
          this.router.navigate(['home/chats']);
        } else {
          this.insertChat();
        }
      });
  }

  insertChat() {
    let ad = { ...this.selectedAd };
    delete ad.image;
    const chatData = {
      buyerId: this.userId,
      buyerName: this.userName,
      sellerId: this.selectedAd.sellerId,
      sellerName: this.selectedAd.sellerName,
      adDetails: ad,
      adId: ad.id,
      chats: [],
    };
    this.fireBaseService.startChat(COLLECTIONS.CHATS, chatData).then(() => {
      this.message.create('success', 'Continue to chat');
      this.router.navigate(['home/chats']);
      sessionStorage.setItem('selectedChatId', ad.id);
    });
  }
}
