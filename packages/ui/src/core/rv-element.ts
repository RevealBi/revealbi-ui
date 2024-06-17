import { LitElement } from "lit";

export class RvElement extends LitElement {

    static define(name: string) {
        customElements.define(name, this);
    }
}
