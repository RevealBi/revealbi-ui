import { customElement, property } from "lit/decorators.js";
import { RvElement } from "../../core/rv-element";
import { merge } from "../../utilties/Merge";
import { ChartType, DashboardFilters, DashboardLinkRequestedArgs, DataLoadingEventArgs, DataPointClickedEventArgs, DataSourceDialogOpeningEventArgs, DataSourcesRequestedArgs, EditorClosedEventArgs, EditorClosingEventArgs, EditorOpenedEventArgs, EditorOpeningEventArgs, FieldsInitializingEventArgs, ImageExportedEventArgs, LinkSelectionDialogOpeningEventArgs, MenuOpeningEventArgs, RevealViewOptions, SaveEventArgs, SeriesColorRequestedArgs, TooltipShowingEventArgs } from "../RevealView";
import { RevealViewDefaults } from "../RevealView/RevealViewDefaults";
import styles from "./reveal-view.styles";
import { PropertyValueMap, html } from "lit";
import { DashboardLoader } from "../../utilties/DashboardLoader";
import { MenuItem } from "../../core";
import { getRVDataSources } from "../../utilties/DataSourceFactory";

declare let $: any;

//this is an experiemental component to see if we can wrap the RevealView component in a web component
@customElement("rv-reveal-view")
export class RvRevealView extends RvElement {
    static override styles = styles;

    private _revealView: any = null;
    private _mergedOptions: RevealViewOptions = RevealViewDefaults;

    /**
     * Gets or sets the dashboard to display in the RevealView component.
     */
    @property({ type: String }) dashboard: string | unknown = "";

    /**
     * Gets or sets the options for the RevealView component.
     */
    @property({ type: Object, attribute: false }) options: any = {};

    /**
     * Gets the dashboard date filter.
     */
    get dateFilter(): any {
        return this._revealView?.dashboard?.dateFilter;
    }

    /**
     * Gets the dashboard filters.
     */
    get filters(): DashboardFilters {
        return this._revealView?.dashboard?.filters;
    }

    /**
     * Represents an event that is triggered when a dashboard link is requested.
     *
     * @event
     * @type {(args: DashboardLinkRequestedArgs) => string}
     * @param {DashboardLinkRequestedArgs} args
     */
    dashboardLinkRequested?: (args: DashboardLinkRequestedArgs) => string;

    /**
     * Represents an event that is triggered when the data loading process starts.
     *
     * @event
     * @type {(args: DataLoadingEventArgs) => void}
     * @param {DataLoadingEventArgs} args
     */
    onDataLoading?: (args: DataLoadingEventArgs) => void;

    /**
     * Represents an event that is triggered when a data point in the visualization is clicked by the user.
     *
     * @event
     * @type {(args: DataPointClickedEventArgs) => void}
     * @param {DataPointClickedEventArgs} args
     */
    onDataPointClicked?: (args: DataPointClickedEventArgs) => void;

    /**
     * Represents an event that is triggered when the data source dialog is opening.
     *
     * @event
     * @type {(args: DataSourceDialogOpeningEventArgs) => void}
     * @param {DataSourceDialogOpeningEventArgs} args
     */
    onDataSourceDialogOpening?: (args: DataSourceDialogOpeningEventArgs) => void;

    /**
     * Represents an event that is triggered when the data sources are requested.
     * 
     * @event
     * @type {(args: DataSourcesRequestedArgs) => any}
     * @param {DataSourcesRequestedArgs} args
     * @returns {any} - A RevealDataSources object containing the data sources and data source items.
     */
    dataSourcesRequested?: (args: DataSourcesRequestedArgs) => any;

    /**
     * Represents an event that is triggered when the visualization editor is closed.
     * 
     * @event
     * @type {(args: EditorClosedEventArgs) => void}
     * @param {EditorClosedEventArgs} args
     */
    onEditorClosed?: (args: EditorClosedEventArgs) => void;

    /**
     * Represents an event that is triggered when the visualization editor is closing.
     * 
     * @event
     * @type {(args: EditorClosingEventArgs) => void}
     * @param {EditorClosingEventArgs} args
     */
    onEditorClosing?: (args: EditorClosingEventArgs) => void;

    /**
     * Represents an event that is triggered when the visualization editor is opened.
     * 
     * @event
     * @type {(args: EditorOpenedEventArgs) => void}
     * @param {EditorOpenedEventArgs} args
     */
    onEditorOpened?: (args: EditorOpenedEventArgs) => void;

    /**
     * Represents an event that is triggered when the visualization editor is opening.
     * 
     * @event
     * @type {(args: EditorOpeningEventArgs) => void}
     * @param {EditorOpeningEventArgs} args
     */
    onEditorOpening?: (args: EditorOpeningEventArgs) => void;

    /**
     * Represents an event that is triggered when the fields are initializing.
     * 
     * @event
     * @type {(args: FieldsInitializingEvent) => void}
     * @param {FieldsInitializingEvent} args
     */
    onFieldsInitializing?: (args: FieldsInitializingEventArgs) => void;

    /**
     * Represents an event that is triggered when the image is exported.
     * 
     * @event
     * @type {(args: ImageExportedEventArgs) => void}
     * @param {ImageExportedEventArgs} args
     */
    onImageExported?: (image: ImageExportedEventArgs) => void;

    /**
     * Represents an event that is triggered when the RevealView is initialized.
     * 
     * @event
     * @type {() => void}
     */
    onInitialized?: () => void;

    /**
     * Represents an event that is triggered when the link dialog is opening.
     * 
     * @event
     * @type {(args: LinkSelectionDialogOpeningEventArgs) => void}
     * @param {LinkSelectionDialogOpeningEventArgs} args
     */
    onLinkSelectionDialogOpening?: (args: LinkSelectionDialogOpeningEventArgs) => void;

    /**
     * Represents an event that is triggered when the menu is opening.
     * 
     * @event
     * @type {(args: MenuOpeningEventArgs) => void}
     * @param {MenuOpeningEventArgs} args
     */
    onMenuOpening?: (args: MenuOpeningEventArgs) => void;

    /**
     * Represents an event that is triggered when the dashboard is saved.
     * 
     * @event
     * @type {(args: SaveEventArgs) => void}
     * @param {SaveEventArgs} args
     */
    onSave?: (args: SaveEventArgs) => void;

    /**
     * Represents an event that is triggered when the series color is requested.
     * 
     * @event
     * @type {(args: SeriesColorRequestedArgs) => string}
     * @param {SeriesColorRequestedArgs} args
     * @returns {string} - The color to use for the series.
     */
    seriesColorRequested?: (args: SeriesColorRequestedArgs) => string;
    
    /**
     * Represents an event that is triggered when the tooltip is showing.
     * 
     * @event
     * @type {(args: TooltipShowingEventArgs) => void}
     * @param {TooltipShowingEventArgs} args
     */
    onTooltipShowing?: (args: TooltipShowingEventArgs) => void;

    protected override firstUpdated(changedProperties: Map<PropertyKey, unknown>): void {
        this.init(this.dashboard, this.options);
    }

    private async init(dashboard?: string | unknown, options?: RevealViewOptions): Promise<void> {
        const rvDashboard = await this.loadRVDashboard(dashboard);

        const selector = this.renderRoot.querySelector('#rv-viewer');
        this._revealView = new $.ig.RevealView(selector);
        this._revealView.interactiveFilteringEnabled = true;

        //this event must be set BEFORE the dashboard is set
        if (this.onDataLoading !== undefined) {
            this._revealView.onDataLoading = (e: any) => {
                this.onDataLoading?.(e);
            }
        }

        //todo: there is a bug in the Reveal SDK where the saved event args.isNew is always false if the dashboard property is set to null or undefined
        if (dashboard) {
            this._revealView.dashboard = rvDashboard;
        }
        this.updateOptions(options);
        this.initializeEvents();

        // After the dashboard has been initialized and set, invoke the onInitialized event if it is defined.
        if (this.onInitialized) {
            this.onInitialized();
        }
    }

    private loadRVDashboard(dashboard?: string | unknown): Promise<unknown> {
        return DashboardLoader.load(dashboard);
    }

    private updateOptions(options: RevealViewOptions | undefined) {

        if (!this._revealView) {
            return;
        }

        this._mergedOptions = merge(RevealViewDefaults, options);

        this._revealView.canEdit = this._mergedOptions.canEdit;
        this._revealView.canSave = this._mergedOptions.canSave;
        this._revealView.canSaveAs = this._mergedOptions.canSaveAs;
        this._revealView.serverSideSave = this._mergedOptions.saveOnServer;
        this._revealView.startInEditMode = this._mergedOptions.startInEditMode;
        this._revealView.startWithNewVisualization = this._mergedOptions.startWithNewVisualization;

        //header
        this._revealView.showHeader = this._mergedOptions.header!.showHeader;
        this._revealView.canAddVisualization = this._mergedOptions.header!.canAddVisualization;
        this._revealView.showMenu = this._mergedOptions.header!.menu!.showMenu;
        this._revealView.showExportToExcel = this._mergedOptions.header!.menu!.exportToExcel;
        this._revealView.showExportImage = this._mergedOptions.header!.menu!.exportToImage;
        this._revealView.showExportToPDF = this._mergedOptions.header!.menu!.exportToPdf;
        this._revealView.showExportToPowerpoint = this._mergedOptions.header!.menu!.exportToPowerPoint;
        this._revealView.showRefresh = this._mergedOptions.header!.menu!.refresh;

        //filters
        this._revealView.showFilters = this._mergedOptions.filters!.showFilters;
        this._revealView.canAddDashboardFiter = this._mergedOptions.filters!.addDashboardFiter;
        this._revealView.canAddDateFilter = this._mergedOptions.filters!.addDateFilter;
        this._revealView.interactiveFilteringEnabled = this._mergedOptions.filters!.interactiveFiltering;

        //visualizations
        this._revealView.canMaximizeVisualization = this._mergedOptions.visualizations!.canMaximize;
        this._revealView.categoryGroupingSeparator = this._mergedOptions.visualizations!.categoryGroupingSeparator;
        this._revealView.crosshairsEnabled = this._mergedOptions.visualizations!.crosshairs;
        this._revealView.hoverTooltipsEnabled = this._mergedOptions.visualizations!.hoverTooltips;
        this._revealView.showChangeVisualization = this._mergedOptions.visualizations!.changeChartType;
        this._revealView.showStatisticalFunctions = this._mergedOptions.visualizations!.statisticalFunctions;
        this._revealView.canCopyVisualization = this._mergedOptions.visualizations!.menu!.copy;
        this._revealView.canDuplicateVisualization = this._mergedOptions.visualizations!.menu!.duplicate;

        //dataSourceDialog
        this._revealView.showDataSourceSelectionDialogSearch = this._mergedOptions.dataSourceDialog!.showSearch;

        //editor
        if (this._mergedOptions.editor!.chartTypes) {
            this._revealView.chartTypes = this._mergedOptions.editor!.chartTypes(this._revealView.chartTypes);
        }

        if (this._mergedOptions.editor!.chartTypesToRemove) {
            this._revealView.chartTypes = this._revealView.chartTypes.filter((x: any) => !this._mergedOptions.editor!.chartTypesToRemove!.includes(x.chartType));
        }

        if (this._mergedOptions.editor!.chartTypesToAdd) {
            this._revealView.chartTypes.push(...this._mergedOptions.editor!.chartTypesToAdd);
        }

        if (typeof this._mergedOptions.editor!.defaultChartType === "string") {
            const isValidChartType = Object.values(ChartType).includes(this._mergedOptions.editor!.defaultChartType as ChartType);
            this._revealView.defaultChartType = isValidChartType ? this._mergedOptions.editor!.defaultChartType : undefined;
            this._revealView.defaultCustomChartType = !isValidChartType ? this._mergedOptions.editor!.defaultChartType : undefined;
        }
        else {
            this._revealView.defaultChartType = this._mergedOptions.editor!.defaultChartType;
        }

        this._revealView.canAddCalculatedFields = this._mergedOptions.editor!.addCalculatedFields;
        this._revealView.canAddPostCalculatedFields = this._mergedOptions.editor!.addPostCalculatedFields;
        this._revealView.showDataBlending = this._mergedOptions.editor!.dataBlending;
        this._revealView.showEditDataSource = this._mergedOptions.editor!.editDataSource;
        this._revealView.showMachineLearningModelsIntegration = this._mergedOptions.editor!.machineLearning;
    }

    private async updateDashboard(dashboard: string | unknown): Promise<void> {
        if (!this._revealView) {
            return;
        }
        this._revealView.dashboard = await this.loadRVDashboard(dashboard);
    }

    private initializeEvents() {
        if (this.onDataPointClicked !== undefined) {
            this._revealView.onVisualizationDataPointClicked = (visualization: any, cell: any, row: any) => {            
                    this.onDataPointClicked?.({ visualization: visualization, cell: cell, row: row });            
            };
        }

        if (this.onDataSourceDialogOpening !== undefined) {
            this._revealView.onDataSourceSelectionDialogShowing = (e: any) => {
                this.onDataSourceDialogOpening?.(e);
            }
        }

        if (this.onFieldsInitializing !== undefined) {
            this._revealView.onFieldsInitializing = (e: any) => {
                this.onFieldsInitializing?.(e);
            }            
        }

        if (this.onTooltipShowing !== undefined) {
            this._revealView.onTooltipShowing = (e: any) => {
                this.onTooltipShowing?.(e);
            }
        }

        if (this.onEditorClosed !== undefined) {
            this._revealView.onVisualizationEditorClosed = (e: any) => {
                this.onEditorClosed?.(e);
            }
        }

        if (this.onEditorClosing !== undefined) {
            this._revealView.onVisualizationEditorClosing = (e: any) => {
                this.onEditorClosing?.(e);
            }
        }
        
        if (this.onEditorOpened !== undefined) {
            this._revealView.onVisualizationEditorOpened = (e: any) => {
                this.onEditorOpened?.(e);
            }
        }
        
        if (this.onEditorOpening !== undefined) {
            this._revealView.onVisualizationEditorOpening = (e: any) => {
                this.onEditorOpening?.(e);
            }
        }

        if (this.onImageExported !== undefined) {
            this._revealView.onImageExported = (e: any) => {
                this.onImageExported?.({
                    image: e,
                });
            }
        }

        if (this.onLinkSelectionDialogOpening !== undefined) {
            this._revealView.onDashboardSelectorRequested = (e: any) => {
                this.onLinkSelectionDialogOpening?.(e);
            }
        }

        if (this.onSave !== undefined) {
            this._revealView.onSave = (rv: any, e: any) => {
                this.onSave?.(e);
            }
        }

        if (this.seriesColorRequested !== undefined) {
            this._revealView.onVisualizationSeriesColorAssigning = (visualization: any, defaultColor: any, fieldName: any, categoryName: any) => {
                return this.seriesColorRequested?.({
                    visualization: visualization,
                    defaultColor: defaultColor,
                    fieldName: fieldName,
                    categoryName: categoryName
                });
            }
        }        

        this._revealView.onMenuOpening = (viz: any, e: any) => {
            const createMenuItems = (items: MenuItem[], clickCallback: (item: any) => void) => {
                items.forEach(item => {
                    const icon = item.icon ? new $.ig.RVImage(item.icon) : undefined;
                    e.menuItems.push(new $.ig.RVMenuItem(item.title, icon, () => clickCallback(item)));
                });
            };
        
            if (viz === null) {
                const items = this.options.header!.menu!.items!;
                createMenuItems(items, item => item.click());
            } else {
                const vizItems = this.options.visualizations!.menu!.items!;
                createMenuItems(vizItems, vizItem => vizItem.click(viz));
            }
        
            if (this.onMenuOpening !== undefined) {
                this.onMenuOpening(e);
            }
        };

        this._revealView.onDataSourcesRequested = (onComplete: any, trigger: any) => {
            //get the data source from the options first
            const { dataSources, dataSourceItems } = getRVDataSources(this.options.dataSources);
            //if a custom data source handler is provided, add the data sources from it
            if (this.dataSourcesRequested !== undefined) {
                const result = this.dataSourcesRequested({trigger: trigger });
                dataSources.push(...result.dataSources);
                dataSourceItems.push(...result.dataSourceItems);
            }
            onComplete(new $.ig.RevealDataSources(dataSources, dataSourceItems, this.options.dataSourceDialog!.showExistingDataSources));
        };

        this._revealView.onLinkedDashboardProviderAsync = (dashboardId: string, title: string) => {
            let dashbordLink = dashboardId;
            if (this.dashboardLinkRequested !== undefined) {
                dashbordLink = this.dashboardLinkRequested({ dashboardId: dashboardId, title: title });
            }
            return $.ig.RVDashboard.loadDashboard(dashbordLink);
        };
    }

    /**
     * Gets the RVDashboard instance from the underlying RevealView object.
     * @returns The RVDashboard instance.
     */
    getRVDashboard(): any {
        if (this._revealView) {
            return this._revealView.dashboard;
        }
        else {
            return null;
        }
    }

    /**
     * Export the dashboard to Excel.
     */
    exportToExcel(): void {
        this._revealView._dashboardView.exportToExcel();
    }

    /**
     * Export the dashboard to an image.
     * @param showDialog - If true, the export dialog will be shown. If false, the image will be exported directly.
     * @returns A promise that resolves to the exported image element or null.
     */
    exportToImage(showDialog = true): void | Promise<Element | null> {

        if (showDialog) {
            this._revealView._dashboardView.exportImage();
            return;
        }

        return this._revealView.toImage();
    }

    /**
     * Export the dashboard to PDF.
     */
    exportToPdf(): void {
        this._revealView._dashboardView.exportToFormat("pdf");
    }

    /**
     * Export the dashboard to PowerPoint.
     */
    exportToPowerPoint(): void {
        this._revealView._dashboardView.exportToFormat("pptx");
    }

    /**
     * Refreshes the data in the dashboard.
     * If no parameter is provided, the entire dashboard is refreshed.
     * If a string ID is provided, the visualization with that ID is refreshed.
     * If a number index is provided, the visualization at that index is refreshed.
     * @param input The ID or index of the visualization to refresh, or nothing to refresh the entire dashboard.
     */
    refreshData(input?: string | number): void {
        if (typeof input === "string") {
            this._revealView._dashboardView.refreshWidget(input);
        } else if (typeof input === "number") {
            this._revealView._dashboardView.refreshWidget(this._revealView.dashboard.visualizations[input].id);
        } else {
            this._revealView.refreshDashboardData();
        }
    }

    protected override updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        const dashboardChanged = changedProperties.has("dashboard") && this.dashboard !== undefined;
        const optionsChanged = changedProperties.has("options") && this.options !== undefined;

        if (dashboardChanged) {
            this.updateDashboard(this.dashboard);
        }

        if (optionsChanged) {
            this.updateOptions(this.options);
        }
    }

    protected override render(): unknown {
        return html`
            <div id="rv-viewer"></div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'rv-reveal-view': RvRevealView;
    }
}