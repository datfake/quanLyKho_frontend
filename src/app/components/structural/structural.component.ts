import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-structural',
  templateUrl: './structural.component.html',
  styleUrls: ['./structural.component.css']
})
export class StructuralComponent implements OnInit {

  public isShow : boolean = true;
  name : string='Đạt Ngô';

  onToggle(){
    this.isShow = !this.isShow;
  }

  age : number;

  products : object[] = [
    {id:1, name :"Iphone 5s" , price :450000 },
    {id:2, name :"Iphone 6s" , price :550000 },
    {id:3, name :"Iphone 7s" , price :650000 },
    {id:4, name :"Iphone 8s" , price :750000 },
  ]
  

  onChange(value)
  {
    this.ischeck = value;
  }

  ischeck : boolean ;

  constructor() { }

  ngOnInit() {
  }



}
