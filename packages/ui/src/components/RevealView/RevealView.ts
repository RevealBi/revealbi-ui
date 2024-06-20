/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartType } from "./Enums";
import { RevealViewDefaults } from "./RevealViewDefaults";
import { merge } from "../../utilties/Merge";
import { getRVDataSources } from "../../utilties/DataSourceFactory";
import { DataLoadingEventArgs, DataPointClickedEventArgs, DataSourceDialogOpeningEventArgs, EditorClosedEventArgs, EditorClosingEventArgs, EditorOpenedEventArgs, EditorOpeningEventArgs, FieldsInitializingEventArgs, ImageExportedEventArgs, MenuOpeningEventArgs, TooltipShowingEventArgs, DashboardLinkRequestedArgs, DataSourcesRequestedArgs, SeriesColorRequestedArgs, SaveEventArgs, LinkSelectionDialogOpeningEventArgs } from "./Events";
import { DashboardLoader } from "../../utilties/DashboardLoader";
import { RevealViewOptions } from "./Options";
import { MenuItem } from "../../core";
import { DashboardFilters } from "./Interfaces/DashboardFilters";

declare let $: any;

export class RevealView {
    private _revealView: any = null;
    //static defaultOptions: RevealViewOptions = RevealViewDefaults;

    /**
     * Gets the underlying RevealView RVDashboard object.
     */
    get dashboard(): any {
        return this._revealView.dashboard;
    }

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
     * Gets or sets the options for the dashboard viewer.
     */
    options: RevealViewOptions = {};

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

    constructor(selector: string, dashboard?: string | unknown, options?: RevealViewOptions) {
        $.ig.RevealSdkSettings.enableNewCharts = true;
        $.ig.RevealSdkSettings.enableActionsOnHoverTooltip = true;
        $.ig.RevealSdkSettings.interactiveFilteringEnabled = true;
        this.init(selector, dashboard, options);
    }

    private async init(selector: string, dashboard?: string | unknown, options?: RevealViewOptions): Promise<void> {
        const rvDashboard = await this.loadRVDashboard(dashboard);
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

    /**
     * Gets the RVDashboard instance from the underlying RevealView object.
     * @returns The RVDashboard instance.
     */
    getRVDashboard(): any {
        if (this._revealView){
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
     */
    refreshData(): void
    /**
     * Refreshes the data of a visualization in the dashboard.
     * @param id The ID of the visualization to refresh.
     */
    refreshData(id: string): void
    /**
     * Refreshes the data of a visualization in the dashboard.
     * @param index The index of the visualization to refresh.
     */
    refreshData(index: number): void
    refreshData(input?: string | number) : void {
        if (typeof input === "string") {
            this._revealView._dashboardView.refreshWidget(input);
        } else if (typeof input === "number") {
            this._revealView._dashboardView.refreshWidget(this._revealView.dashboard.visualizations[input].id);
        } else {
            this._revealView.refreshDashboardData();
        }     
    }

    /**
     * Updates the dashboard with a new dashboard object.
     * @param dashboard The dashboard to load. Can be a string (dashboard ID or name) or an object such as an RVDashboard or RdashDocument.
     */
    async updateDashboard(dashboard: string | unknown): Promise<void> {
        if (!this._revealView) {
            return;
        }
        this._revealView.dashboard = await this.loadRVDashboard(dashboard);
    }

    /**
     * Updates the options of the dashboard viewer.
     * @param options 
     */
    updateOptions(options: RevealViewOptions | undefined) {

        if (!this._revealView) {
            return;
        }

        this.options = merge({}, RevealViewDefaults, options);

        this._revealView.canEdit = this.options.canEdit;
        this._revealView.canSave = this.options.canSave;
        this._revealView.canSaveAs = this.options.canSaveAs;
        this._revealView.serverSideSave = this.options.saveOnServer;
        this._revealView.startInEditMode = this.options.startInEditMode;
        this._revealView.startWithNewVisualization = this.options.startWithNewVisualization;

        //header
        this._revealView.showHeader = this.options.header!.showHeader;
        this._revealView.canAddVisualization = this.options.header!.canAddVisualization;
        this._revealView.showMenu = this.options.header!.menu!.showMenu;
        this._revealView.showExportToExcel = this.options.header!.menu!.exportToExcel;
        this._revealView.showExportImage = this.options.header!.menu!.exportToImage;
        this._revealView.showExportToPDF = this.options.header!.menu!.exportToPdf;
        this._revealView.showExportToPowerpoint = this.options.header!.menu!.exportToPowerPoint;
        this._revealView.showRefresh = this.options.header!.menu!.refresh;

        //filters
        this._revealView.showFilters = this.options.filters!.showFilters;
        this._revealView.canAddDashboardFiter = this.options.filters!.addDashboardFiter;
        this._revealView.canAddDateFilter = this.options.filters!.addDateFilter;
        this._revealView.interactiveFilteringEnabled = this.options.filters!.interactiveFiltering;

        //visualizations
        this._revealView.canMaximizeVisualization = this.options.visualizations!.canMaximize;
        this._revealView.categoryGroupingSeparator = this.options.visualizations!.categoryGroupingSeparator;
        this._revealView.crosshairsEnabled = this.options.visualizations!.crosshairs;
        this._revealView.hoverTooltipsEnabled = this.options.visualizations!.hoverTooltips;
        this._revealView.showChangeVisualization = this.options.visualizations!.changeChartType;
        this._revealView.showStatisticalFunctions = this.options.visualizations!.statisticalFunctions;
        this._revealView.canCopyVisualization = this.options.visualizations!.menu!.copy;
        this._revealView.canDuplicateVisualization = this.options.visualizations!.menu!.duplicate;

        //dataSourceDialog
        this._revealView.showDataSourceSelectionDialogSearch = this.options.dataSourceDialog!.showSearch;

        //editor
        if (this.options.editor!.chartTypes) {
            this._revealView.chartTypes = this.options.editor!.chartTypes(this._revealView.chartTypes);
        }
        
        if (this.options.editor!.chartTypesToRemove) {
            this._revealView.chartTypes = this._revealView.chartTypes.filter((x: any) => !this.options.editor!.chartTypesToRemove!.includes(x.chartType));
        }

        if (this.options.editor!.chartTypesToAdd) {
            this._revealView.chartTypes.push(...this.options.editor!.chartTypesToAdd);
        }

        if (typeof this.options.editor!.defaultChartType === "string") {
            const isValidChartType = Object.values(ChartType).includes(this.options.editor!.defaultChartType as ChartType);
            this._revealView.defaultChartType = isValidChartType ? this.options.editor!.defaultChartType : undefined;
            this._revealView.defaultCustomChartType = !isValidChartType ? this.options.editor!.defaultChartType : undefined;
        } 
        else {            
            this._revealView.defaultChartType = this.options.editor!.defaultChartType;
        }

        this._revealView.canAddCalculatedFields = this.options.editor!.addCalculatedFields;
        this._revealView.canAddPostCalculatedFields = this.options.editor!.addPostCalculatedFields;
        this._revealView.showDataBlending = this.options.editor!.dataBlending;
        this._revealView.showEditDataSource = this.options.editor!.editDataSource;
        this._revealView.showMachineLearningModelsIntegration = this.options.editor!.machineLearning;
    }

    /**
     * Calls updateSize on the underlying RevealView.
     */
    updateLayout() {
        this._revealView.updateSize();
    }

    /**
     * Updates the theme of the dashboard viewer.
     */
    updateTheme() {
        this._revealView.refreshTheme();
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

}