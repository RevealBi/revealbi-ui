export interface TooltipShowingEventArgs {
    cancel: boolean;
    readonly cell: any;
    readonly row: any;
    readonly visualization: any;
}