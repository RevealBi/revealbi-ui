
export interface LinkSelectionDialogOpeningEventArgs {
    /**
     *  The callback to be called when the dialog is closed.
     * @param dashboardId The id of the dashboard that was selected.
     */
    readonly callback: (dashboardId: string) => void;
}
