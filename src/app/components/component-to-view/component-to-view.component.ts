import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-to-view',
  templateUrl: './component-to-view.component.html',
  styleUrls: ['./component-to-view.component.css']
})
export class ComponentToViewComponent implements OnInit {

  public imglink : string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHonJVc_M6xEJBHymHbiOM_hlHBTWAWcte01y7qbzTNGcg-hx&s';
  user = {
    name : 'Đạt Ngô'

  }
  constructor() { }

  ngOnInit() {
  }
  showInfo()
  {
    return `Họ tên: ${this.user['name']}`;
  }

  public isBoder : boolean = false;

}
