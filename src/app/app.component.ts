import { Component } from '@angular/core';
import { parse } from 'querystring';

export class Fruit{
  name: string;
  price: number;
}

export class Item{
  itemName: string;
  itemQty: string;
  itemPrice: number;
  itemAmount: number;
  itemIndex: number;
  constructor(itemName:string, itemQty:string, itemPrice:number, itemAmount:number, itemIndex:number){
    this.itemName=itemName;
    this.itemQty=itemQty;
    this.itemPrice=itemPrice;
    this.itemAmount=itemAmount;
    this.itemIndex=itemIndex;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public fruits: Fruit[] = [
    {name:"Apples", price:1.23},
    {name:"Peaches", price: 1.39},
    {name:"Pears", price: 1.58},
    {name:"Plums", price: 3.02},
  ];

  submitted = false;

  submitInfo(){
    this.submitted = true; 
  }


  items:Array<Item>
  constructor(){
    this.items = [];
    this.addItem("name","qty");
    
  }

 index = 0;

  addItem(name,qty){
    if(parseInt(qty)>0){
    for(let i = 0; i < this.fruits.length; i++){
      if(name == this.fruits[i].name){
        let newItem = new Item(
          name,
          qty,
          this.fruits[i].price,
          Math.round(parseInt(qty)*this.fruits[i].price*100)/100,
          this.index++
        );
        this.items.push(newItem)
        console.log(this.items);
        console.log(this.items[0]);
        console.log(this.items[0].itemIndex);
      }
   }}
   this.subtotal();
   this.taxAmount();
   this.totalAmount();
  }

  removeItem(num:number){
    for(let i=0; i< this.items.length;i++){
      if(this.items[i].itemIndex === num){
        this.items.splice(i,1);
      }
    }
    this.subtotal();
    this.taxAmount();
    this.totalAmount();
    console.log(this.items);
  }

sum;

subtotal(){
  this.sum = 0;
  for(let j = 0;j<this.items.length;j++){
    this.sum += this.items[j].itemAmount;
  }
  this.sum = (Math.round(this.sum*100)/100).toFixed(2);
  return this.sum;
}

tax;

taxAmount(){
  this.tax = 0;
  this.tax = (this.sum*0.05).toFixed(2);
  return this.tax;
}

total;

totalAmount(){
  this.total = 0;
  this.total = (this.sum*1.05).toFixed(2);
  return this.total;
}


}
