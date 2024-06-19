import type { Meta, StoryObj } from '@storybook/web-components';
import  { RvDialog } from "./index";
import { html } from 'lit';
import { doc } from 'prettier';

const meta: Meta = {
    title: 'Dialog',
    component: 'rv-dialog',
};
export default meta;
type Story = StoryObj;

export const FirstStory: Story = {
    name: 'Default',
    args: {
        title: 'Test Title',
        open: true,
    },
    render: (args: any) => html`
        <rv-dialog .title=${args.title} .open=${args.open}></rv-dialog>
    `,
};

export const SecondStory: Story = {
    name: 'Show',
    args: {
        title: 'Test Title',
    },
    render: (args: any) => html`
        <h1>Use the show() method to open the dialog.</h1>
        <button @click=${() => openDialog("dialog")}>Open Dialog</button>
        <rv-dialog .title=${args.title} id="dialog"></rv-dialog>
    `,
};

export const ThirdStory: Story = {
    name: 'Custom Footer',
    args: {
        title: 'Test Title',
        open: true,
    },
    render: (args: any) => html`
        <h1>Use the close() method to close the dialog.</h1>
        <rv-dialog .title=${args.title} .open=${args.open} id="dialog">
            <div slot="footer">
                <button class="rv-button-cancel" @click=${() => closeDialog("dialog")}>Blank</button>
                <button class="rv-button" @click=${() => closeDialog("dialog")}>Primary</button>
                <button class="rv-button-error" @click=${() => closeDialog("dialog")}>Error</button>
            </div>
        </rv-dialog>
    `,
};

const openDialog = (id: string) => {
    const dialogElement = document.getElementById(id);
    if (dialogElement instanceof RvDialog) {
        dialogElement.show().then((result: any) => {
            console.log(`Dialog closed with result: ${result}`);
        });
    } else {
        console.error("Element is not an instance of RvDialog");
    }
} 

const closeDialog = (id: string) => {
    const dialogElement = document.getElementById(id);
    if (dialogElement instanceof RvDialog) {
        dialogElement.close("custom");
    } else {
        console.error("Element is not an instance of RvDialog");
    }
}