import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  sideBarItems = [
    {
      text: 'Ads',
      icon: 'ads.svg',
      route: 'ads'
    },
    {
      text: 'My Ads',
      icon: 'my-ads.svg',
      route: 'my'
    },
    {
      text: 'Saved Ads',
      icon: 'saved.svg',
      route: 'saved'
    },
    {
      text: 'Chats',
      icon: 'chat.svg',
      route: 'chats'
    }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  isRouteActive(route: string): boolean {
    return this.router.url.includes(route)
  }

  navigateToRoute(route: string) {
    this.router.navigate(['home/' + route])
  }

}
