import { RvDialog } from "./dialog.component";

export * from "./dialog.component";
export default RvDialog;

RvDialog.define('rv-dialog');

declare global {
  interface HTMLElementTagNameMap {
    'rv-dialog': RvDialog;
  }
}