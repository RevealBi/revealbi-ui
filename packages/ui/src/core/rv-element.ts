import { LitElement } from "lit";

export class RvElement extends LitElement {

    //todo: not sure how I want to handle defining the custom element
    static define(name: string) {
        if (!customElements.get(name)) {
            customElements.define(name, this);
        }
    }
}
