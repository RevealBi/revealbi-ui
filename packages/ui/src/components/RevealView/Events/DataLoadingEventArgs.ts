export interface DataLoadingEventArgs {
    cancel: boolean;
    errorMessage: string;
    readonly visualization: any;
}
