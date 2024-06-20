import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { doc } from 'prettier';
import './index';

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Reveal View',
    component: 'rv-reveal-view',
};

export default meta;
type Story = StoryObj;

export const FirstStory: Story = {
    name: 'Default',
    args: {
        dashboard: 'Sales',
    },
    argTypes: {
        dashboard: { 
            options: [ 'Sales', 'Marketing', 'Campaigns' ],
            control: 'select' 
        },
    },
    render: (args: any) => html`
    <rv-reveal-view .dashboard=${args.dashboard}></rv-reveal-view>
    `,
};

export const ExportStory: Story = {
    name: 'Export',
    render: (args: any) => html`
    <div style="height: 100%">
        <div>
            <button onclick="revealView.exportToImage()">Export Image</button>    
            <button onclick="revealView.exportToExcel()">Export Excel</button>
            <button onclick="revealView.exportToPdf()">Export PDF</button>
            <button onclick="revealView.exportToPowerPoint()">Export PPT</button>            
        </div>
        <rv-reveal-view id="revealView" dashboard="Sales"></rv-reveal-view>
    </div>
    `,
};

export const RefreshtStory: Story = {
    name: 'Refresh',
    render: (args: any) => html`
    <div style="height: 100%">
        <div>
            <button onclick="revealView.refreshData()">Refresh Dashboard</button>    
            <button onclick="revealView.refreshData(2)">Refresh Visualization by Index</button>
            <button onclick="revealView.refreshData('7c50f5c3-3b7a-4f6a-aeae-78581998433b')">Refresh Visualization by Id</button>                      
        </div>
        <rv-reveal-view id="revealView" dashboard="Sales"></rv-reveal-view>
    </div>
    `,
};