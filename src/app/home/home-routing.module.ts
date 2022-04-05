import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads/ads.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { SavedAdsComponent } from './saved-ads/saved-ads.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'ads',
        component: AdsComponent
      },
      {
        path: '',
        redirectTo: 'ads',
        pathMatch: 'full'
      },
      {
        path: 'my',
        component: MyAdsComponent
      },
      {
        path: 'saved',
        component: SavedAdsComponent
      },
      {
        path: 'chats',
        component: ChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
