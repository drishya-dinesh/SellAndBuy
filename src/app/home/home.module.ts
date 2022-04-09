import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AdsComponent } from './ads/ads.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { SavedAdsComponent } from './saved-ads/saved-ads.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DateAgoPipe } from './time-ago';
import { AdsListComponent } from './ads-list/ads-list.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AdFilterPipe } from '../services/ad-filter.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    AdsComponent,
    SideBarComponent,
    NavBarComponent,
    MyAdsComponent,
    SavedAdsComponent,
    DateAgoPipe,
    AdsListComponent,
    ChatComponent,
    AdFilterPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    NzModalModule,
    NzSelectModule,
    NzPopoverModule,
    NzMessageModule,
    NzDropDownModule,
    NzSpinModule
  ]
})
export class HomeModule { }
