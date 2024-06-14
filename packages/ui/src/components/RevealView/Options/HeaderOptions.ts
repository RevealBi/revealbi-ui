import { MenuItem } from "../../../core/menu-item";

export interface HeaderOptions {
    /**
     * Gets or sets if the user can add a new visualization.
     */
    canAddVisualization?: boolean;
    /**
     * Gets or sets if the header is shown.
     */
    showHeader?: boolean;
    menu?: {
        /**
         * Gets or sets if the menu is shown.
         */
        showMenu?: boolean;
        /**
         * Gets or sets if the menu item "Export to Image" is shown.
         */
        exportToImage?: boolean;
        /**
         * Gets or sets if the menu item "Export to Excel" is shown.
         */
        exportToExcel?: boolean;
        /**
         * Gets or sets if the menu item "Export to PowerPoint" is shown.
         */
        exportToPowerPoint?: boolean;
        /**
         * Gets or sets if the menu item "Export to PDF" is shown.
         */
        exportToPdf?: boolean;
        /**
         * Gets or sets if the menu item "Refresh" is shown.
         */
        refresh?: boolean;
        /**
         * Adds custom menu items to the menu.
         * @example
         * menu: {
         *    items: [
         *       { icon: "icon", title: "title", action: () => { } },
         *    ]
         * }
         */
        items?: MenuItem[];
    };
}
