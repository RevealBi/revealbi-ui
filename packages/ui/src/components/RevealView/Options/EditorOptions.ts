import { ChartType } from "../Enums/ChartType";
import { ChartTypeCustomItem } from "./ChartTypeCustomItem";
import { ChartTypeItem } from "./ChartTypeItem";


export interface EditorOptions {
    /**
     * Modifies, filters, or augments the provided list of chart types that appear in the Chart Types selection dialog.
     * @param {ChartTypeItem[]} chartTypes - The array of default chart type items.
     * @returns {ChartTypeItem[]} - An array of processed chart type items.
     */
    chartTypes?: (chartTypes: ChartTypeItem[]) => ChartTypeItem[];
    /**
     * Gets or sets the array of chart types to remove from the default chart types.
     */
    chartTypesToRemove?: ChartType[];
    /**
     * Gets or sets the array of custom chart types to add to the Chart Types selection dialog.
     */
    chartTypesToAdd?: ChartTypeCustomItem[];
    /**
     * Gets or sets the default chart type to use when creating a new visualization.
     */
    defaultChartType?: ChartType | string;
    /**
     * Gets or set if the f(x) option in numeric values sections (like "Values") should be displayed or not.
     */
    addPostCalculatedFields?: boolean;
    /**
     * Gets or sets if new (calculated) fields can be added to the list of fields.
     */
    addCalculatedFields?: boolean;
    /**
     * Gets or sets if the button "Add fields from another data source" should be available or not.
     */
    dataBlending?: boolean;
    /**
     * Gets or sets if the edit button for a datasource should be displayed or not.
     */
    editDataSource?: boolean;
    /**
     * Gets or sets if the button "Add fields from a Machine Learning model" should be available or not.
     */
    machineLearning?: boolean;
}
