/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { VisualizationViewerDefaults } from "./VisualizationViewerDefaults";
import { VisualizationViewerOptions } from "./VisualizationViewerOptions";
import { merge } from "../../utilties/Merge";
import { DashboardLoader } from "../../utilties/DashboardLoader";

declare let $: any;

export class VisualizationViewer {

    private _revealView: any = null;
    options: VisualizationViewerOptions = {};

    constructor(selector: string, dashboard?: string | unknown, visualization?: string | number, options?: VisualizationViewerOptions) {
        $.ig.RevealSdkSettings.enableNewCharts = true;
        this.init(selector, dashboard, visualization, options);
    }

    private async init(selector: string, dashboard?: string|  unknown, visualization?: string | number, options?: VisualizationViewerOptions): Promise<void> {

        const rvDashboard = await this.loadRVDashboard(dashboard);
        this._revealView = new $.ig.RevealView(selector);
        this._revealView.canEdit = false;
        this._revealView.singleVisualizationMode = true;
        this._revealView.showHeader = false;
        this._revealView.showBreadcrumbDashboardTitle = false;

        this.updateOptions(options);

        this._revealView.dashboard = rvDashboard;

        this.setVisualization(rvDashboard, visualization);

        this._revealView.onMenuOpening = (viz: any, e: any) => {
            if (viz === null) {
                return;
            }
            else {
                const vizItems = this.options.menu!.items!;
                vizItems.forEach(vizItem => {
                    e.menuItems.push(new $.ig.RVMenuItem(vizItem.title, vizItem.icon, () => vizItem.click(viz)));
                })
            }
        }
    }

    private setVisualization(dashboard: any, visualization: string | number | undefined) {
        if (!dashboard || !dashboard.visualizations || dashboard.visualizations.length === 0) {
            this._revealView.maximizedVisualization = null;
            return;
        }

        visualization = visualization !== undefined ? visualization : 0;

        let viz = null;
        if (typeof visualization === "string") {
            // First try to get the visualization by ID
            viz = dashboard.visualizations.getById(visualization);
            
            // If not found by ID, try to get it by title
            if (viz === null) {
                viz = dashboard.visualizations.getByTitle(visualization);
            }
        } else if (typeof visualization === "number") {
            viz = dashboard.visualizations[visualization];
        }

        if (!viz) {
            console.log(`Visualization ${typeof visualization === "string" ? `with ID or title "${visualization}"` : `at index ${visualization}`} is not found. Loading the default vizualization.`);
        }

        this._revealView.maximizedVisualization = viz;
    }

    /**
     * Updates the dashboard with a new dashboard object and optionally a new visualization.
     * @param dashboard The dashboard to load. Can be a string (dashboard ID or name) or an object such as an RVDashboard or RdashDocument.
     * @param visualization The visualization to load. Can be a string (visualization ID or title) or a number (visualization index).
     */
    async updateDashboard(dashboard: string | unknown, visualization?: string | number): Promise<void> {
        if (!this._revealView) {
            return;
        }
        this._revealView.dashboard = await this.loadRVDashboard(dashboard);
        this.setVisualization(this._revealView.dashboard, visualization);
    }

    updateOptions(options: VisualizationViewerOptions | undefined) {
        if (!this._revealView) {
            return;
        }

        this.options = merge({}, VisualizationViewerDefaults, options);

        this._revealView.showExportToExcel = this.options.menu!.exportToExcel;
        this._revealView.showExportImage = this.options.menu!.exportToImage;
        this._revealView.showMenu = this.options.menu!.showMenu;
        this._revealView.showRefresh = this.options.menu!.refresh;

        this._revealView.showFilters = this.options.showFilters;

        this._revealView.categoryGroupingSeparator = this.options.categoryGroupingSeparator;
        this._revealView.crosshairsEnabled = this.options.crosshairs;
        this._revealView.hoverTooltipsEnabled = this.options.hoverTooltips;
        this._revealView.showChangeVisualization = this.options.changeChartType;
        this._revealView.showStatisticalFunctions = this.options.statisticalFunctions;
        this._revealView.canCopyVisualization = this.options.menu!.copy;
        this._revealView.canDuplicateVisualization = this.options.menu!.duplicate;
    }

    updateVisualization(visualization?: string | number) {
        if (!this._revealView) {
            return;
        }
        this.setVisualization(this._revealView.dashboard, visualization);        
    }

    private async loadRVDashboard(dashboard?: string | unknown): Promise<any | null> {
        return DashboardLoader.load(dashboard);
    }
}