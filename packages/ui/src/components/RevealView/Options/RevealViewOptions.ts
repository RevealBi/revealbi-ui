import { DataSourcesConfig } from "../DataSources";
import { DataSourceDialogOptions } from "./DataSourceDialogOptions";
import { EditorOptions } from "./EditorOptions";
import { FilterOptions } from "./FilterOptions";
import { HeaderOptions } from "./HeaderOptions";
import { VisualizationOptions } from "./VisualizationOptions";

export interface RevealViewOptions {
    /**
     * Gets or sets if the user can end edit mode to edit the dashboard.
     */
    canEdit?: boolean;
    /**
     * Gets or sets if the user can save the dashboard.
     */
    canSave?: boolean;
    /**
     * Gets or sets if the user can save the dashboard as a new dashboard.
     */
    canSaveAs?: boolean;
    /**
     * Gets or sets the data sources that can be used to create dashboards.
     */
    dataSources?: DataSourcesConfig;
    /**
     * Gets or sets if saving occurs on the server
     */
    saveOnServer?: boolean;
    /**
     * Gets or sets if the DashboardViewer should start in edit mode.
     */
    startInEditMode?: boolean;
    /**
     * Gets or sets if the DashboardViewer should start with a new visualization.
     */
    startWithNewVisualization?: boolean;
    header?: HeaderOptions;
    filters?: FilterOptions;
    dataSourceDialog?: DataSourceDialogOptions;
    visualizations?: VisualizationOptions;
    editor?: EditorOptions;
}
