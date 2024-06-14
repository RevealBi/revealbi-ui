declare let $: any;

export class RevealSdkSettings {

    private static _serverUrl: string = "";

    public static set serverUrl(url: string) {
        this._serverUrl = url;
        $.ig.RevealSdkSettings.setBaseUrl(this._serverUrl);
    }

    public static get serverUrl(): string {
        return this._serverUrl;
    }

}