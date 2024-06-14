export interface EditorClosingEventArgs {
    cancel: boolean;
    readonly isNewVisualization: boolean;
    resetVisualization: boolean;
    readonly visualization: any;
}
