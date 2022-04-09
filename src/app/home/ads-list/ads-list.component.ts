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

  @Input() searchText: any = false;

  @Output() refreshAdList: EventEmitter<any> = new EventEmitter<any>();

  userId: any = '';

  userName: any = '';

  showAdDetails = false;

  selectedAd: any;

  saveLoading = false;

  showDelete = false;

  deleteLoading = false;

  imageIndex = 0;

  constructor(
    private fireBaseService: FireBaseService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('userName');
  }

  openAdDetails(ad: any) {
    this.selectedAd = ad;
    this.imageIndex = 0
    this.showAdDetails = true;
  }

  closeAdDetails() {
    this.showAdDetails = false;
  }

  saveAd(ad: any) {
    let savedUsers = ad.savedUsers;
    if (ad.savedUsers.includes(this.userId)) {
      savedUsers = savedUsers.filter((x: any) => x !== this.userId)
      ad.savedUsers = savedUsers;
    }
    else {
      savedUsers.push(this.userId);
      ad.savedUsers.push(this.userId);
    }
    this.saveLoading = true;
    this.fireBaseService
      .saveAd(COLLECTIONS.ALL_ADS, ad.id, savedUsers)
      .then(() => {
        this.saveLoading = false;
        this.message.create('success', 'Ad Saved Successfully');
      }).finally(() => {
        this.saveLoading = false;
      });
  }

  deleteAdClick() {
    this.showDelete = true;
  }

  confirmDelete() {
    this.deleteLoading = true;
    this.fireBaseService.deleteAd(COLLECTIONS.ALL_ADS, this.selectedAd.id).then(() => {
      this.deleteLoading = false;
      this.message.create('success', 'Ad Deleted Successfully');
      this.selectedAd = undefined;
      this.showDelete = false;
      this.showAdDetails = false;
      this.refreshAdList.emit()
    }).catch(() => {
      this.deleteLoading = false;
      this.message.create('error', 'Couldn\'t delete Ad. !');
    })
  }

  cancelDelete() {
    this.showDelete = false;
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
      this.imageIndex = 0
    } else {
      this.imageIndex += 1;
    }
  }

  onMessageClick() {
    this.fireBaseService.checkChatExists(COLLECTIONS.CHATS, this.selectedAd, this.userId).subscribe((val: any) => {
      if (val.length > 0) {
        this.message.create('success', 'Continue to chat');
        sessionStorage.setItem('selectedChatId', val[0].adId);
        this.router.navigate(['home/chats'])
      } else {
        this.insertChat();
      }
    })
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
      chats: []
    }
    this.fireBaseService.startChat(COLLECTIONS.CHATS, chatData).then(() => {
      this.message.create('success', 'Continue to chat');
      this.router.navigate(['home/chats'])
      sessionStorage.setItem('selectedChatId', ad.id);
    })
  }
}
