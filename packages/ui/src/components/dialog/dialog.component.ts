import { LitElement, html } from "lit";
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from "./dialog.styles";

/**
 * @summary Dialogs appear above the page and require the user's immediate attention. They inform users about critical information, require users to make decisions, or involve multiple tasks.
 *
 * @slot - The dialog's main content.
 * @slot header-actions - Optional actions to add to the header.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 *
 * @csspart overlay - The overlay that covers the screen behind the dialog.
 * @csspart panel - The dialog's panel (where the dialog and its content are rendered).
 * @csspart header - The dialog's header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header.
 * @csspart title - The dialog's title.
 * @csspart close-button - The close button.
 * @csspart content - The dialog's content.
 * @csspart footer - The dialog's footer.
 *
 * @cssproperty --width - The preferred width of the dialog. Note that the dialog will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing - The amount of padding to use for the header.
 * @cssproperty --body-spacing - The amount of padding to use for the body.
 * @cssproperty --footer-spacing - The amount of padding to use for the footer.
 *
 */
export class RvDialog extends LitElement {
    static override styles = styles;

    /**
     * The dialog's title as displayed in the header.
     */
    @property() override title: string = "";
    
    /**
     * Indicates whether or not the dialog is open. You can toggle this attribute to show and hide the dialog, or you can
     * use the `show()` and `close()` methods and this attribute will reflect the dialog's open state.
     */
    @property({ type: Boolean, reflect: true }) open: boolean = false;

    private _closeResolver?: (value: string | PromiseLike<any>) => void;

    /**
     * Shows the dialog.
     * @returns Promise that resolves when the dialog is closed. The resolved value is the source of the close action.
     */
    show(): Promise<any> {
        this.open = true;
        return new Promise<any>((resolve) => {
            this._closeResolver = resolve;
        });
    }

    /**
     * Hides the dialog.
     * @param source The source of the close action. This can be a string or an object. The resolved value of the promise returned by `show()` will be this value.
     */
    close(source: any | "close-button" | "overlay") {
        //todo: emit event that is cancelable
        if (this._closeResolver) {
            this._closeResolver(source);
            this._closeResolver = undefined; // Reset after use
        }
        this.open = false;
    }

    //todo: hide header
    //todo: hide close button
    //todo: hide footer

    protected override render(): unknown {
        return html`
        <div id="dialog" class="${classMap({
            dialog: true,
            'dialog--open': this.open
        })}">
            <div part="overlay" class="dialog__overlay" @click="${() => this.close('overlay')}" tabindex="-1"></div>
            <div part="panel" class="dialog__panel" role="dialog" 
                 aria-modal="true"
                 aria-hidden=${this.open ? 'false' : 'true'}
                 tabindex="-1">
                <header part="header" class="dialog__header">
                    <div part="title" class="dialog__title"> ${this.title.length > 0 ? this.title : String.fromCharCode(65279)} </div>
                    <div part="header-actions" class="dialog__header-actions">
                        <slot name="header-actions"></slot>
                        <div part="close-button" class="dialog__close" @click="${() => this.close('close-button')}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor" >
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </div>
                    </div>
                </header>
                <slot part="content" class="dialog__content"></slot>
                <footer part="footer" class="dialog__footer">
                    <slot name="footer">
                        <button class="rv-button" @click="${() => this.close('close-button')}">Ok</button>
                    </slot>                    
                </footer>
            </div>
        </div>
        `;
    }
}

if (!customElements.get('rv-dialog')) {
    customElements.define('rv-dialog', RvDialog);
}

declare global {
    interface HTMLElementTagNameMap {
        'rv-dialog': RvDialog;
    }
}