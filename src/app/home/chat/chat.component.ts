import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { COLLECTIONS } from '../app-constants';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedChatIndex = -1;
  interval: any;

  selectedChatId: any = '';

  chatList: any = [];

  inputMessage = '';

  userId: any = '';

  constructor(private firebaseService: FireBaseService) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.selectedChatId = sessionStorage.getItem('selectedChatId');
    this.fetchChat();
    this.interval = setInterval(() => {
      this.fetchChat();
    }, 5000);
  }
  fetchChat() {
    let chat: any = [];
    this.firebaseService
      .allChats(COLLECTIONS.CHATS, this.userId, 'buyerId')
      .subscribe((val: any) => {
        chat = val;
        this.firebaseService
          .allChats(COLLECTIONS.CHATS, this.userId, 'sellerId')
          .subscribe((val: any) => {
            this.chatList = chat.concat(val);
            this.getSelectedChatIndex();
          });
      });
  }

  getSelectedChatIndex() {
    this.selectedChatIndex = this.chatList.findIndex(
      (x: any) => (x.adId = this.selectedChatId)
    );
    this.selectedChatIndex =
      this.selectedChatIndex === -1 && this.chatList.length > 0
        ? 0
        : this.selectedChatIndex;
  }

  selectChat(index: number) {
    this.selectedChatIndex = index;
    sessionStorage.setItem('selectedChatId', this.chatList[index].adId);
  }

  sendMessage() {
    const message = {
      message: this.inputMessage,
      sentBy: this.userId,
    };
    this.chatList[this.selectedChatIndex].chats.push(message);
    this.inputMessage = '';
    this.firebaseService
      .sendMessage(
        COLLECTIONS.CHATS,
        this.chatList[this.selectedChatIndex].id,
        this.chatList[this.selectedChatIndex].chats
      )
      .then(() => {
        console.log('message sent');
      });
  }
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
