export interface MenuOpeningEventArgs {
    cancel: boolean;
    readonly isInEditMode: boolean;
    menuItems: any[];
    readonly menuLocation: any;
    readonly visualization: any;
}
