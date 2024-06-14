import { MenuItem } from "../../../core/menu-item";


export interface VisualizationOptions {
    /**
     * Gets or sets if the user can maximize a visualization.
     */
    canMaximize?: boolean;
    /**
     * Gets or sets the grouping separator that appears between the category and field name. The default character used is "/" (forward slash).
     */
    categoryGroupingSeparator?: string;
    /**
     * Gets or sets if crosshairs are shown when hovering over a visualization.
     */
    crosshairs?: boolean;
    /**
     * Gets or sets if tooltips are shown when hovering over a visualization.
     */
    hoverTooltips?: boolean;
    /**
     * Gets or sets if the Change Chart Type dropdown is shown.
     */
    changeChartType?: boolean;
    /**
     * Gets or sets if the Statistical Functions dropdown is shown.
     */
    statisticalFunctions?: boolean;
    menu?: {
        /**
         * Gets or sets if the "Copy" menu item is shown.
         */
        copy?: boolean;
        /**
         * Gets or sets if the "Duplicate" menu item is shown.
         */
        duplicate?: boolean;
        /**
         * Adds custom menu items to the menu.
         * @example
         * menu: {
         *    items: [
         *       { icon: "icon", title: "title", action: (visualization) => { } },
         *    ]
         * }
         */
        items?: MenuItem[];
    };
}
