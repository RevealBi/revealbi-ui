import { html } from "lit";
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from "./dialog.styles";
import { RvElement } from "../../core/rv-element";

export class RvDialog extends RvElement {
    static override styles = styles;

    @property() 
    override title: string = "";

    @property({type: Boolean, reflect: true}) 
    open: boolean = false;

    private _closeResolver?: (value: string | PromiseLike<any>) => void;

    show(): Promise<any> {
        this.open = true;
        return new Promise<any>((resolve) => { 
            this._closeResolver = resolve;
        });
    }

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