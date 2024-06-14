export interface SaveEventArgs {
    dashboardId: string;
    name: string;
    readonly isNew: boolean;
    readonly saveAs: boolean;
    saveFinished: () => void;
    serialize: (callback: (result: any) => void, errorCallback: (error: any) => void) => void;
    serializeWithNewName: (newName: string, callback: (result: any) => void, errorCallback: (error: any) => void) => void;
}