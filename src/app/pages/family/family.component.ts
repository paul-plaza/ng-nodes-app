import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FamilyModel, GraphModel } from 'src/app/models';
import { FamilyService } from 'src/app/services/family/family.service';
import * as shape from 'd3-shape';
import { DialogModel, TypeModal } from 'src/app/shared/components/dialog/dialog.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { GraphComponent, Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from 'src/app/config/customDagreNodesOnly';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyComponent implements OnInit {
  @ViewChild('myChart') child!: GraphComponent;
  families: Array<FamilyModel> = [];
  curve = shape.curveNatural;
  selected!: string;
  public layout: Layout = new DagreNodesOnlyLayout();
  //create a graph with nodes and links
  init: GraphModel = new GraphModel(
    {
      nodes: [
        {
          id: 'start',
          label: 'start',
          data: {
            hasIcon: true,
            icon: 'star',
            colorBox: '#ff9999',
            text: 'texto',
            title: 'titulo'
          }
        },
        {
          id: 'end',
          label: 'End',
          data: {
            hasIcon: true,
            icon: 'star',
            colorBox: '#66ffcc',
            text: 'texto',
            title: 'titulo'
          }
        }],
      links: [
        { source: 'start', target: 'end' }
      ]
    }
  );

  graph: GraphModel = this.init;

  constructor(private dialog: MatDialog, private service: FamilyService, private cd: ChangeDetectorRef) {

  }

  async ngOnInit(): Promise<void> {
    this.families = await lastValueFrom(this.service.getFamily())
  }

  async selectFamily(item: FamilyModel) {

    if (item) {

      const result = await lastValueFrom(this.service.getNodes(item.id));

      this.graph.nodes = [...result.nodes.map((x: any) => {
        return {
          id: x.id,
          label: x.label,
          data: {
            hasIcon: x.data.hasIcon,
            icon: x.data.icon,
            title: x.data.title,
            colorBox: x.data.colorBox,
            text: x.data.text
          }
        }
      })];

      this.graph.links = [...result.links]

      this.cd.detectChanges();
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
