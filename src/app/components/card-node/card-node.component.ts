import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-node',
  templateUrl: './card-node.component.html',
  styleUrls: ['./card-node.component.scss']
})
export class CardNodeComponent implements OnInit {

  @Input() dataIn: any;
  constructor() { }

  ngOnInit(): void {


  }

}
