import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RevealSdkSettings, RevealViewOptions, RvDialog, RvRevealView, RvVisualizationViewer, SaveEventArgs, VisualizationViewerOptions } from '@revealbi/ui';

RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
//RevealSdkSettings.serverUrl = "http://localhost:5111";

@Component({
  standalone: true,
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChild("revealView") revealView!: ElementRef<RvRevealView>;;
  @ViewChild("vizViewer") vizViewer!: ElementRef<RvVisualizationViewer>;
  @ViewChild("dialog") dialog!: ElementRef<RvDialog>;
  title = 'Save Dashboard';
  isOpen: boolean = false;

  dashboard?: string = "Campaigns";
  visualization?: string | number = 5;
  options: RevealViewOptions = {
    dataSources: [
      { type: "REST", title: "Sales by Category", subtitle: "Excel2Json", url: "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9" },
    ],
    header: {
      menu: {
        showMenu: true,
        items: [
          { title: "Item 1", click: (viz) => alert("Item 1") },
          { title: "Item 2", click: (viz) => alert("Item 2") },
          { title: "Item 3", click: (viz) => alert("Item 3") },
        ]
      }
    },
  }
  vizOptions: VisualizationViewerOptions = {
    showFilters: true,
    menu: {
      showMenu: true,
    }
  }

  ngAfterViewInit(): void {
    //this.revealView.nativeElement.onSave = (args) => this.onSave(args);
  }

  async onSave(args: SaveEventArgs) {
    console.log("onSave event received");
    const result = await this.dialog.nativeElement.show();

    if (result === "save-button") {
      args.dashboardId = args.name = result;
      args.saveFinished();
    } else {
      console.log("Save cancelled");
      return;
    }
  }

  async handleSave($event: Event) {
    console.log("Data Bound onSave event received");
    const args: SaveEventArgs = ($event as CustomEvent).detail;
    const result = await this.dialog.nativeElement.show();

    if (result === "save-button") {
      args.dashboardId = args.name = result;
      args.saveFinished();
    } else {
      console.log("Save cancelled");
      return;
    }
  }

  footerButtonClick() {
    const filter = this.revealView?.nativeElement.filters?.getByTitle("CampaignID");
    if (filter) {
        filter.selectedValues = ["Diamond", "Ruby"];
    }   
    this.dialog.nativeElement.close("save-button");
  }

  doSomething() {
    this.vizViewer.nativeElement.options = {
      showFilters: false,
      menu: {
        showMenu: false,
      }
    }
  }
}
