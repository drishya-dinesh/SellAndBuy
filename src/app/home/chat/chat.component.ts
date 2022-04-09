import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { COLLECTIONS } from '../app-constants';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  selectedChatIndex = -1;

  selectedChatId: any = '';

  chatList: any = []

  inputMessage = '';

  userId: any = '';

  constructor(
    private firebaseService: FireBaseService
  ) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.selectedChatId = sessionStorage.getItem('selectedChatId');
    this.firebaseService.allChats(COLLECTIONS.CHATS, this.userId, 'buyerId').subscribe((val: any) => {
      this.chatList = this.chatList.concat(val);
      this.firebaseService.allChats(COLLECTIONS.CHATS, this.userId, 'sellerId').subscribe((val: any) => {
        this.chatList = this.chatList.concat(val)
        this.getSelectedChatIndex();
      })
    })
  }

  getSelectedChatIndex() {
    this.selectedChatIndex = this.chatList.findIndex((x: any) => x.adId = this.selectedChatId)
  }

  selectChat(index: number) {
    this.selectedChatIndex = index;
    sessionStorage.setItem('selectedChatId', this.chatList[index].adId);
  }

  sendMessage() {
    const message = {
      message: this.inputMessage,
      sentBy: this.userId
    }
    this.chatList[this.selectedChatIndex].chats.push(message);
    this.inputMessage = '';
    this.firebaseService.sendMessage(COLLECTIONS.CHATS, this.chatList[this.selectedChatIndex].id, this.chatList[this.selectedChatIndex].chats).then(() => {
      console.log('message sent');
    })
  }

}
