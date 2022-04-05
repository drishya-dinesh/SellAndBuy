import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  selectedChatIndex = -1;

  chatList = [
    {
      name: 'Product Name',
      createdBy: 'James David',
      id: 'ea12',
      chats: [
        {
          message: 'Hi, Is this available?.',
          type: 'buyer'
        },
        {
          message: 'Yes, Are you interested?.',
          type: 'seller'
        },
        {
          message: 'My I know more details about the product?.',
          type: 'buyer'
        },
        {
          message: 'Yes, Sure.\n The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. The iPhone runs the iOS operating system, and in 2021 when the iPhone 13 was introduced, it offered up to 1 TB of storage and a 12-megapixel camera.',
          type: 'seller'
        }
      ]
    },
    {
      name: 'Product Name',
      createdBy: 'James David',
      id: 'ea12',
      chats: [
        {
          message: 'Hi, Is this available?.',
          type: 'buyer'
        },
        {
          message: 'Yes, Are you interested.',
          type: 'seller'
        }
      ]
    }
  ]

  inputMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  selectChat(index: number) {
    this.selectedChatIndex = index;
  }

  sendMessage() {
    const message = {
      message: this.inputMessage,
      type: 'buyer'
    }
    this.chatList[this.selectedChatIndex].chats.push(message);
    this.inputMessage = '';
  }

}
