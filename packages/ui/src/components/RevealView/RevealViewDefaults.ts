import { RevealViewOptions } from "./Options";
import { ChartType } from "./Enums";

export const RevealViewDefaults: RevealViewOptions = {
    canEdit: true,
    canSave: true,
    canSaveAs: true,
    dataSources: [],
    saveOnServer: true,
    startInEditMode: false,
    startWithNewVisualization: false,

    header: {
        showHeader: true,
        canAddVisualization: true,
        menu: {
            showMenu: true,
            exportToExcel: true,
            exportToImage: true,
            exportToPdf: true,
            exportToPowerPoint: true,
            refresh: true,
            items: [],
        },
    },

    filters: {
        addDashboardFiter: true,
        addDateFilter: true,
        interactiveFiltering: true,
        showFilters: true,
    },

    dataSourceDialog: {
        showExistingDataSources: false,
        showSearch: false,        
    },

    visualizations: {
        canMaximize: true,
        categoryGroupingSeparator: " - ",
        crosshairs: false,
        hoverTooltips: true,
        changeChartType: true,
        statisticalFunctions: true,
        menu: {
            copy: true,
            duplicate: true,
            items: []
        }
    },

    editor: {
        defaultChartType: ChartType.ColumnChart,
        addPostCalculatedFields: true,
        addCalculatedFields: true,
        dataBlending: true,
        editDataSource: false,
        machineLearning: false,
    },
}