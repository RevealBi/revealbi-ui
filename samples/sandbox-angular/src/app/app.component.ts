import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RevealSdkSettings, RevealViewOptions, RvDialog, RvVisualizationViewer, SaveEventArgs, VisualizationViewerOptions } from '@revealbi/ui';
import { RevealViewComponent } from '@revealbi/ui-angular';

RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
//RevealSdkSettings.serverUrl = "http://localhost:5111";

@Component({
  standalone: true,
  imports: [RouterModule, RevealViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild("revealView") revealView!: RevealViewComponent;
  @ViewChild("vizViewer") vizViewer!: ElementRef<RvVisualizationViewer>;
  @ViewChild("dialog") dialog!: ElementRef<RvDialog>;
  title = 'Save Dashboard';
  isOpen: boolean = true;

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

  async ngOnInit() {

  }

  async onSave($event: SaveEventArgs) {

    const result = await this.dialog.nativeElement.show();

    if (result === "save-button") {
      $event.dashboardId = $event.name = result;
      $event.saveFinished();
    } else {
      console.log("Save cancelled");
      return;
    }
  }

  footerButtonClick() {
    const filter = this.revealView?.filters?.getByTitle("CampaignID");
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
