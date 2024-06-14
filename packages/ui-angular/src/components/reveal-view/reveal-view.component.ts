import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DashboardLinkRequestedArgs, RevealView, RevealViewOptions, DataLoadingEventArgs, DataPointClickedEventArgs, DataSourceDialogOpeningEventArgs, DataSourcesRequestedArgs, EditorClosedEventArgs, EditorClosingEventArgs, EditorOpenedEventArgs, EditorOpeningEventArgs, FieldsInitializingEventArgs, ImageExportedEventArgs, MenuOpeningEventArgs, SaveEventArgs, SeriesColorRequestedArgs, TooltipShowingEventArgs, LinkSelectionDialogOpeningEventArgs, DashboardFilters } from '@revealbi/ui';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'reveal-view',
  template: `<div #revealView [id]="id"></div>`,
  styleUrls: ['./reveal-view.component.scss'],
})
export class RevealViewComponent implements AfterViewInit, OnChanges {

  @ViewChild('revealView') el!: ElementRef;
  private viewer!: RevealView;
  id: string = `revealView-${Math.random().toString(36).substr(2, 9)}`; 

  /**
   * Gets the dashboard date filter.
   */
  get dateFilter() {
    return this.viewer?.dateFilter;
  }

  /**
   * Gets the dashboard filters.
   */
  get filters(): DashboardFilters | undefined {
    return this.viewer?.filters;
  }

  /**
   * The dashboard to be displayed.
   */
  @Input() dashboard?: string | unknown;
  /**
   * The options to configure the dashboard viewer.
   */
  @Input() options?: RevealViewOptions;

  /**
   * The callback to be invoked when the dashboard link is requested.
   * @param args The dashboard link requested arguments.
   * @returns The dashboard link.
   */
  @Input() dashboardLinkRequested?: (args: DashboardLinkRequestedArgs) => string;
  /**
   * The callback to be invoked when the data sources are requested.
   * @param args The data sources requested arguments.
   * @returns The RevealDataSources object which contains the data sources and data source items.
   */
  @Input() dataSourcesRequested?: (args: DataSourcesRequestedArgs) => any;
  /**
   * The callback to be invoked when the series color is requested.
   * @param args The series color requested arguments.
   * @returns The series color.
   */
  @Input() seriesColorRequested?: (args: SeriesColorRequestedArgs) => string;


  /**
   * Represents an event that is emitted when data starts to load.
   *
   * @event
   * @type {EventEmitter<DataLoadingEventArgs>}
   * @example
   * ```html
   * <reveal-view (dataLoading)="handleDataLoading($event)"></reveal-view>
   * ```
   * ```ts
   * handleDataLoading(event: DataLoadingEventArgs) {
   *     // Handle the data loading event here
   * }
   * ```
   */
  @Output() dataLoading = new EventEmitter<DataLoadingEventArgs>();
  /**
   * Represents an event that is emitted when a data point is clicked.
   * 
   * @event
   * @type {EventEmitter<DataPointClickedEventArgs>}
   * @example
   * ```html
   * <reveal-view (dataPointClicked)="handleDataPointClicked($event)"></reveal-view>
   * ```
   * ```ts
   * handleDataPointClicked(event: DataPointClickedEventArgs) {
   *    // Handle the data point clicked event here
   * }
   * ```
   */
  @Output() dataPointClicked = new EventEmitter<DataPointClickedEventArgs>();
  /**
   * Represents an event that is emitted when the data source dialog is opening.
   * 
   * @event
   * @type {EventEmitter<DataSourceDialogOpeningEventArgs>}
   * @example
   * ```html
   * <reveal-view (dataSourceDialogOpening)="handleDataSourceDialogOpening($event)"></reveal-view>
   * ```
   * ```ts
   * handleDataSourceDialogOpening(event: DataSourceDialogOpeningEventArgs) {
   *    // Handle the data source dialog opening event here
   * }
   * ```
   */
  @Output() dataSourceDialogOpening = new EventEmitter<DataSourceDialogOpeningEventArgs>();
  /**
   * Represents an event that is emitted when the editor is closed.
   * 
   * @event
   * @type {EventEmitter<EditorClosedEventArgs>}
   * @example
   * ```html
   * <reveal-view (editorClosed)="handleEditorClosed($event)"></reveal-view>
   * ```
   * ```ts
   * handleEditorClosed(event: EditorClosedEventArgs) {
   *   // Handle the editor closed event here
   * }
   * ```
   */
  @Output() editorClosed = new EventEmitter<EditorClosedEventArgs>();
  /**
   * Represents an event that is emitted when the editor is closing.
   * 
   * @event
   * @type {EventEmitter<EditorClosingEventArgs>}
   * @example
   * ```html
   * <reveal-view (editorClosing)="handleEditorClosing($event)"></reveal-view>
   * ```
   * ```ts
   * handleEditorClosing(event: EditorClosingEventArgs) {
   *    // Handle the editor closing event here
   * }
   * ```
   */
  @Output() editorClosing = new EventEmitter<EditorClosingEventArgs>();
  /**
   * Represents an event that is emitted when the editor is opened.
   * 
   * @event
   * @type {EventEmitter<EditorOpenedEventArgs>}
   * @example
   * ```html
   * <reveal-view (editorOpened)="handleEditorOpened($event)"></reveal-view>
   * ```
   * ```ts
   * handleEditorOpened(event: EditorOpenedEventArgs) {
   *    // Handle the editor opened event here
   * }
   * ```
   */
  @Output() editorOpened = new EventEmitter<EditorOpenedEventArgs>();
  /**
   * Represents an event that is emitted when the editor is opening.
   * 
   * @event
   * @type {EventEmitter<EditorOpeningEventArgs>}
   * @example
   * ```html
   * <reveal-view (editorOpening)="handleEditorOpening($event)"></reveal-view>
   * ```
   * ```ts
   * handleEditorOpening(event: EditorOpeningEventArgs) {
   *    // Handle the editor opening event here
   * }
   * ```
   */
  @Output() editorOpening = new EventEmitter<EditorOpeningEventArgs>();
  /**
   * Represents an event that is emitted when the fields are initializing.
   * 
   * @event
   * @type {EventEmitter<FieldsInitializingEvent>}
   * @example
   * ```html
   * <reveal-view (fieldsInitializing)="handleFieldsInitializing($event)"></reveal-view>
   * ```
   * ```ts
   * handleFieldsInitializing(event: FieldsInitializingEventArgs) {
   *   // Handle the fields initializing event here
   * }
   * ```
   */
  @Output() fieldsInitializing = new EventEmitter<FieldsInitializingEventArgs>();
  /**
   * Represents an event that is emitted when the image is exported.
   * 
   * @event
   * @type {EventEmitter<ImageExportedEventArgs>}
   * @example
   * ```html
   * <reveal-view (imageExported)="handleImageExported($event)"></reveal-view>
   * ```
   * ```ts
   * handleImageExported(event: ImageExportedEventArgs) {
   *    // Handle the image exported event here
   * }
   * ```
   */
  @Output() imageExported = new EventEmitter<ImageExportedEventArgs>();
  /**
   * Represents an event that is emitted when the view is initialized.
   * 
   * @event
   * @type {EventEmitter<void>}
   * @example
   * ```html
   * <reveal-view (initialized)="handleInitialized()"></reveal-view>
   * ```
   * ```ts
   * handleInitialized() {
   *    // Handle the initialized event here
   * }
   * ```
   */
  @Output() initialized = new EventEmitter<void>();
  /**
   * Represents an event that is emitted when the link selection dialog is opening.
   * 
   * @event
   * @type {EventEmitter<LinkSelectionDialogOpeningEventArgs>}
   * @example
   * ```html
   * <reveal-view (linkSelectionDialogOpening)="handleLinkSelectionDialogOpening($event)"></reveal-view>
   * ```
   * ```ts
   * handleLinkSelectionDialogOpening(event: LinkSelectionDialogOpeningEventArgs) {
   *    // Handle the link selection dialog opening event here
   *    event.callback("dashboardId"); //must be called to complete the link selection dialog operation
   * }
   * ```
   */
  @Output() linkSelectionDialogOpening = new EventEmitter<LinkSelectionDialogOpeningEventArgs>;
  /**
   * Represents an event that is emitted when the menu is opening.
   * 
   * @event
   * @type {EventEmitter<MenuOpeningEventArgs>}
   * @example
   * ```html
   * <reveal-view (menuOpening)="handleMenuOpening($event)"></reveal-view>
   * ```
   * ```ts
   * handleMenuOpening(event: MenuOpeningEventArgs) {
   *    // Handle the menu opening event here
   * }
   * ```
   */
  @Output() menuOpening = new EventEmitter<MenuOpeningEventArgs>();
  /**
   * Represents an event that is emitted when the dashboard is saved.
   * 
   * @event
   * @type {EventEmitter<SavedEventArgs>}
   * @example
   * ```html
   * <reveal-view (save)="handleSave($event)"></reveal-view>
   * ```
   * ```ts
   * handleSave(event: SaveEventArgs) {
   *    // Handle the saved event here
   *    event.saveFinished(); //must be called to complete the save operation and exit edit mode
   * }
   * ```
   */
  @Output() save = new EventEmitter<SaveEventArgs>();
  /**
   * Represents an event that is emitted when the tooltip is showing.
   * 
   * @event
   * @type {EventEmitter<TooltipShowingEventArgs>}
   * @example
   * ```html
   * <reveal-view (tooltipShowing)="handleTooltipShowing($event)"></reveal-view>
   * ```
   * ```ts
   * handleTooltipShowing(event: TooltipShowingEventArgs) {
   *    // Handle the tooltip showing event here
   * }
   * ```
   */
  @Output() tooltipShowing = new EventEmitter<TooltipShowingEventArgs>();

  ngAfterViewInit(): void {
    this.viewer = new RevealView(this.el.nativeElement, this.dashboard, this.options);

    if (this.dataLoading.observed) {
      this.viewer.onDataLoading = (args) => this.dataLoading.emit(args);
    }
    if (this.dataPointClicked.observed) {
      this.viewer.onDataPointClicked = (args) => this.dataPointClicked.emit(args);
    }
    if (this.dataSourceDialogOpening.observed) {
      this.viewer.onDataSourceDialogOpening = (args) => this.dataSourceDialogOpening.emit(args);
    }
    if (this.dataSourcesRequested !== undefined) {
      this.viewer.dataSourcesRequested = this.dataSourcesRequested;
    }
    if (this.editorClosed.observed) {
      this.viewer.onEditorClosed = (args) => this.editorClosed.emit(args);
    }
    if (this.editorClosing.observed) {
      this.viewer.onEditorClosing = (args) => this.editorClosing.emit(args);
    }
    if (this.editorOpened.observed) {
      this.viewer.onEditorOpened = (args) => this.editorOpened.emit(args);
    }
    if (this.editorOpening.observed) {
      this.viewer.onEditorOpening = (args) => this.editorOpening.emit(args);
    }
    if (this.fieldsInitializing.observed) {
      this.viewer.onFieldsInitializing = (args) => this.fieldsInitializing.emit(args);
    }
    if (this.imageExported.observed) {
      this.viewer.onImageExported = (args) => this.imageExported.emit(args);
    }
    if (this.initialized.observed) {
      this.viewer.onInitialized = () => this.initialized.emit();
    }
    if (this.dashboardLinkRequested !== undefined) {
      this.viewer.dashboardLinkRequested = this.dashboardLinkRequested;
    }
    if (this.linkSelectionDialogOpening.observed) {
      this.viewer.onLinkSelectionDialogOpening = (args) => this.linkSelectionDialogOpening.emit(args);
    }
    if (this.menuOpening.observed) {
      this.viewer.onMenuOpening = (args) => this.menuOpening.emit(args);
    }
    if (this.save.observed) {
      this.viewer.onSave = (args) => this.save.emit(args);
    }
    if (this.seriesColorRequested !== undefined) {
      this.viewer.seriesColorRequested = this.seriesColorRequested;
    }
    if (this.tooltipShowing.observed) {
      this.viewer.onTooltipShowing = (args) => this.tooltipShowing.emit(args);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    //set the options first. if the dashboard is set in the same cycle, it will automatically refresh the view
    if (changes["options"] && !changes["options"].isFirstChange()) {      
      this.viewer.updateOptions(this.options);

      //call updateTheme only if dashboard itself is not being updated in the same cycle.
      //calling updateTheme acts as a refresh for the dashboard. There may be a better way.
      if (!(changes["dashboard"] && !changes["dashboard"].isFirstChange())) {
        this.viewer.updateTheme();
      }
    }

    if (changes["dashboard"] && !changes["dashboard"].isFirstChange()) {
      this.viewer.updateDashboard(this.dashboard!);
    }
  }
}
