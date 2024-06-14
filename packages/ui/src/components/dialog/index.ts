import { RvDialog } from "./dialog.component";

export { RvDialog } from "./dialog.component";

declare global {
    interface HTMLElementTagNameMap {
      'rv-dialog': RvDialog;
    }
  }