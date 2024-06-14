
export interface DataSourceDialogOpeningEventArgs {
    /**
     * set to true to show custom dialog
     */
    cancel: boolean;
    /**
     * the callback to use when the selection is ready, can only be used if the event is cancelled.
     */
    readonly callback: any;
    /**
     * list of data sources returned by onDataSourcesRequested
     */
    readonly dataSources: any;
    /**
     * indicates the context where the data sources are being requested
     */
    readonly trigger: string;
}
