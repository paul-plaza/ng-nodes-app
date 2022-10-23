import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FamilyModel, GraphModel } from 'src/app/models';
import { FamilyService } from 'src/app/services/family/family.service';
import * as shape from 'd3-shape';
import { DialogModel, TypeModal } from 'src/app/shared/components/dialog/dialog.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Configuration } from 'src/app/config/config';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyComponent implements OnInit {

  families: Array<FamilyModel> = [];
  curve = shape.curveStep;
  selected!: string;

  //create a graph with nodes and links
  init: GraphModel = new GraphModel(
    {
      nodes: [
        {
          id: 'start',
          label: 'start'
        },
        {
          id: 'end',
          label: 'End'
        }],
      links: [
        { source: 'start', target: 'end' }
      ]
    }
  );

  graph: GraphModel = this.init;

  constructor(private dialog: MatDialog, private service: FamilyService) {

  }
  async ngOnInit(): Promise<void> {
    this.families = await lastValueFrom(this.service.getFamily())
  }

  async selectFamily(item: FamilyModel) {

    console.log(Configuration.server);


    if (item) {

      const result = await lastValueFrom(this.service.getNodes(item.id));
      console.log(this.graph);

      this.graph = new GraphModel({
        nodes: result.nodes,
        links: result.links
      });
      return;
    }

    const modal: DialogModel<number> = new DialogModel<number>({
      type: TypeModal.Alert,
      message: "Debes seleccionar al menos un registro",
      title: "Advertencia"
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = modal;
    this.dialog.open(DialogComponent, dialogConfig);

    this.graph = this.init;
  }
}
