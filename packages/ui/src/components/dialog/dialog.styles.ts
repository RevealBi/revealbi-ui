import { css } from "lit";
import componentStyles from "../../styles/component.styles";

export default css`
    ${componentStyles}

    :host {
        --dialog-width: 31rem;

        --header-spacing: var(--rv-spacing-large);
        --body-spacing: var(--rv-spacing-large);
        --footer-spacing: var(--rv-spacing-large);   
 
        display: none;
    }

    :host([open]) {
        display: contents;
    }

    .dialog__overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--rv-dialog-background-color-overlay);
    }

    .dialog {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .dialog--open .dialog__panel {
        display: flex;
        opacity: 1;
      }

    .dialog__panel {
        display: flex;
        flex-direction: column;
        z-index: 2;
        width: var(--dialog-width);
        max-width: calc(100% - var(--rv-spacing-2x-large));
        max-height: calc(100% - var(--rv-spacing-2x-large));
        background-color: var(--rv-dialog-background-color);
        border-radius: var(--rv-border-radius-large);
        box-shadow: var(--rv-shadow-x-large);
    }

    .dialog__panel:focus {
        outline: none;
    }

    .dialog__header {
        flex: 0 0 auto;
        display: flex;
        background-color: var(--rv-dialog-background-color-header);
        height: 44px;
        font-size: 1.125rem; /* 18px */
        line-height: 1.4;
        border-radius: var(--rv-border-radius-large) var(--rv-border-radius-large) 0 0;
    }

    .dialog__header-actions {
        flex-shrink: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
        gap: var(--rv-spacing-2x-small);
    }

    .dialog__title {
        flex: 1 1 auto;
        margin: 0;
        font-weight: 600;
        text-overflow: ellipsis;
        padding: 0.75rem;
    }

    .dialog__close {
        background-color: transparent;
        border: none;
        border-radius: var(--rv-border-radius-circle);
        width: 36px;
        height: 36px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s;
        margin: 0.25rem;
    }
      
    .dialog__close:hover {
        background-color: hsl(0 0% 80% / 50%);
    }

    .dialog__content {
        flex: 1 1 auto;
        display: block;
        min-height: 250px;
        padding: var(--body-spacing);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }

    .dialog__footer {
        flex: 0 0 auto;
        height: 64px;
        text-align: right;
        background-color: var(--rv-dialog-background-color-footer);
        padding: var(--rv-spacing-small);
        border-radius: 0 0 var(--rv-border-radius-large) var(--rv-border-radius-large);
        box-shadow: 0 -4px 8px -1px rgba(0, 0, 0, 0.1);
    }

    .rv-button  {
        background-color: var(--rv-button-background-color);
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px; /* Adjust font size as needed */
        cursor: pointer;
        border-radius: 20px;
        transition: background-color 0.3s, box-shadow 0.3s; /* Smooth transition for hover effects */
      }
    
      .rv-button:hover {
        background-color: var(--rv-button-background-color-hover);
      }
`;