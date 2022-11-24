import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FamilyModel, GraphModel } from 'src/app/models';
import { FamilyService } from 'src/app/services/family/family.service';
import * as shape from 'd3-shape';
import { DialogModel, TypeModal } from 'src/app/shared/components/dialog/dialog.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from 'src/app/config/customDagreNodesOnly';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyComponent implements OnInit {
  families: Array<FamilyModel> = [];
  curve = shape.curveNatural;
  selected!: string;
  public layout: Layout = new DagreNodesOnlyLayout();

  layoutSettings = {
    orientation: 'TB',
    nodePadding: 15
  };
  //create a graph with nodes and links
  init: GraphModel = new GraphModel(
    {
      nodes: [
        {
          id: "0",
          label: "FAGUNDEZ",
          data: {
            hasIcon: true,
            icon: "home",
            colorBox: "#000000",
            text: "",
            title: ""
          }
        },
        {
          id: "CL1723769798",
          label: "YEINNY FAGUNDEZ",
          data: {
            hasIcon: true,
            icon: "star",
            colorBox: "#ff0000",
            text: "YEINNY FAGUNDEZ",
            title: "LÃ\u00adder Hermanos,EX,ESPOSA"
          },
        },
        {
          id: "CL1101160032",
          label: "ANDRES FLORES",
          data: {
            hasIcon: false,
            icon: "home",
            colorBox: "#000000",
            text: "ANDRES FLORES",
            title: "ESPOSA"
          },
        },
        {
          id: "CL1719690487",
          label: "JULIO TORRES",
          data: {
            hasIcon: false,
            icon: "home",
            colorBox: "#000000",
            text: "JULIO TORRES",
            title: "EX"
          }
        },
        {
          id: "CL1710483585",
          label: "RAUL FLORES",
          data: {
            hasIcon: false,
            icon: "star",
            colorBox: "#ff0000",
            text: "RAUL FLORES",
            title: "2"
          }
        },
        {
          id: "CL1717877714",
          label: "ARIADNA FLORES",
          data: {
            hasIcon: false,
            icon: "star",
            colorBox: "#ff0000",
            text: "ARIADNA FLORES",
            title: "2"
          }
        },
        {
          id: "CL0903686962",
          label: "ESTEBAN FLORES",
          data: {
            hasIcon: false,
            icon: "star",
            colorBox: "#ff0000",
            text: "ESTEBAN FLORES",
            title: "Blanco"
          },
        },
        {
          id: "CL1758496135",
          label: "DANIEL TORRES",
          data: {
            hasIcon: false,
            icon: "star",
            colorBox: "#ff0000",
            text: "DANIEL TORRES",
            title: "2"
          },
        }
      ],
      links: [
        {
          source: "0",
          target: "CL1723769798",
        },
        {
          source: "CL1723769798",
          target: "CL1101160032",
        },
        {
          source: "CL1723769798",
          target: "CL1719690487",
        },
        {
          source: "CL1101160032",
          target: "CL1710483585",
        },
        {
          source: "CL1101160032",
          target: "CL1717877714",
        },
        {
          source: "CL1717877714",
          target: "CL0903686962",
        },
        {
          source: "CL1719690487",
          target: "CL1758496135",
        }
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

      this.graph.links = [...result.links.map((x: any) => {
        return {
          source: x.source,
          target: x.target
        }
      })];

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
