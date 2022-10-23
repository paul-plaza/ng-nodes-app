import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from './dialog.model';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public observation: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public dialog: DialogModel<any>) { }

  ngOnInit() {
  }

}
