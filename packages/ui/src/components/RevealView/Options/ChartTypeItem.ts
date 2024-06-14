import { ChartType } from "../Enums";

export interface ChartTypeItem {
    chartType: ChartType;
    title: string;
    icon: string;
    groups: string[];
}
