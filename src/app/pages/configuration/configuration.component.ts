import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { DialogModel, TypeModal } from 'src/app/shared/components/dialog/dialog.model';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public isBusy: boolean = false;

  public form: FormGroup = new FormGroup({
    server: new FormControl("", Validators.required),
  });

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

    this.form.patchValue({
      server: localStorage.getItem("server-url") != null ? localStorage.getItem("server-url") : environment.service
    });
  }

  onSave() {

    localStorage.setItem("server-url", this.form.value.server);

    this.transaccionOk();
  }

  onDefault() {
    localStorage.setItem("server-url", environment.service);
    this.form.patchValue({
      server: environment.service
    });

    this.transaccionOk();
  }

  private transaccionOk() {
    const modal: DialogModel<number> = new DialogModel<number>({
      type: TypeModal.Alert,
      message: "Se ha realizado el cambio con éxito!",
      title: "Exitoso"
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = modal;
    this.dialog.open(DialogComponent, dialogConfig);
  }
}
