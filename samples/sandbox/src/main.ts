
import { ChartType, RevealSdkSettings, RevealView, RevealViewOptions, RvDialog } from "@revealbi/ui";

RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";

const options: RevealViewOptions = {
    canSaveAs: false,
    dataSources: [
        { type: "REST", title: "Sales by Category", subtitle: "Excel2Json", url: "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9" },
        { type: "RemoteFile", format: "CSV", title: "CSV Data", url: "https://raw.githubusercontent.com/fivethirtyeight/data/master/airline-safety/airline-safety.csv" },
        { type: "RemoteFile", format: "JSON", title: "JSON Data", url: "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9" }
    ],
    header: {
        menu: {
            items: [
                { title: "Menu Item 1", click: () => alert("Menu Item 1 Clicked!"), icon: "https://users.infragistics.com/Reveal/Images/download.png" },
                { title: "Menu Item 2", click: () => alert("Menu Item 2 Clicked!") }
            ]
        }
    },
    editor: {
        chartTypesToRemove: [ ChartType.ColumnChart, ChartType.LineChart, ChartType.PieChart ],
        chartTypesToAdd: [
            { title: "Custom Chart", url: "https://revealbi.io", icon: "https://help.revealbi.io/img/logo.png", groups: ["Most Popular"] }
        ]
    }
};

const createDashboardViewerWithString = async (name: string) => {
    const viewer = new RevealView("#viewer", name, options);
}

const dialog = document.getElementById('dialog') as RvDialog;
dialog.open = true;

createDashboardViewerWithString("Campaigns");