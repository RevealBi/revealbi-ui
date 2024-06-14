export interface EditorOpeningEventArgs {
    cancel: boolean;
    readonly isNewVisualization: boolean;
    readonly visualization: any;
}
