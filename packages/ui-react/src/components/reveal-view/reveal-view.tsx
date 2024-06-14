import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { RevealView as Viewer, RevealViewOptions, SeriesColorRequestedArgs, DashboardLinkRequestedArgs, DataSourcesRequestedArgs, DataLoadingEventArgs, DataPointClickedEventArgs, DataSourceDialogOpeningEventArgs, EditorClosedEventArgs, EditorClosingEventArgs, EditorOpenedEventArgs, EditorOpeningEventArgs, FieldsInitializingEventArgs, ImageExportedEventArgs, MenuOpeningEventArgs, SaveEventArgs, TooltipShowingEventArgs, LinkSelectionDialogOpeningEventArgs, DashboardFilters } from '@revealbi/ui';
import styles from './reveal-view.module.scss';

export interface RevealViewProps {
  dashboard?: string | unknown;
  options?: RevealViewOptions;
  style?: CSSProperties;
  //callback function properties
  dashboardLinkRequested?: (args: DashboardLinkRequestedArgs) => string;
  dataSourcesRequested?: (args: DataSourcesRequestedArgs) => any;
  seriesColorRequested?: (args: SeriesColorRequestedArgs) => string; 
  //event properties
  onDataLoading?: (args: DataLoadingEventArgs) => void;
  onDataPointClicked?: (args: DataPointClickedEventArgs) => void;
  onDataSourceDialogOpening?: (args: DataSourceDialogOpeningEventArgs) => void;  
  onEditorClosed?: (args: EditorClosedEventArgs) => void;
  onEditorClosing?: (args: EditorClosingEventArgs) => void;
  onEditorOpened?: (args: EditorOpenedEventArgs) => void;
  onEditorOpening?: (args: EditorOpeningEventArgs) => void;
  onFieldsInitializing?: (args: FieldsInitializingEventArgs) => void;
  onImageExported?: (args: ImageExportedEventArgs) => void;
  onInitialized?: () => void;
  onLinkSelectionDialogOpening?: (args: LinkSelectionDialogOpeningEventArgs) => void;
  onMenuOpening?: (args: MenuOpeningEventArgs) => void;
  onSave?: (args: SaveEventArgs) => void;
  onTooltipShowing?: (args: TooltipShowingEventArgs) => void;
}

export interface RevealViewRef {
  readonly dateFilter: any;
  readonly filters: DashboardFilters | undefined;
  getRVDashboard: () => any;
  refreshData: () => void;
}

export const RevealView = forwardRef<RevealViewRef, RevealViewProps>((props, ref) => {
  const { dashboard, options, style, ...eventHandlers } = props;
  // Define default styles and ensure type correctness
  const defaultStyle: CSSProperties = { height: '100%', width: '100%', position: 'relative', minHeight: '250px' };
  const combinedStyle: CSSProperties = { ...defaultStyle, ...style }; // Merge with user-provided styles
  const uniqueId = useMemo(() => `revealView-${Math.random().toString(36).substr(2, 9)}`, []);  
  const dvRef = useRef<Viewer | null>(null);
  const revealViewReference = useRef(null);

  useEffect(() => {
    if (!dvRef.current && revealViewReference.current) {
      dvRef.current = new Viewer(revealViewReference.current, dashboard, options);
    }

    return () => {
      dvRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    if (dvRef.current) {
      dvRef.current.updateOptions(options);
      dvRef.current.updateDashboard(dashboard);
    }
  }, [dashboard, options]);  

  useEffect(() => {
    if (!dvRef.current) return;
    
    Object.entries(eventHandlers).forEach(([key, handler]) => {
      if (handler) {
        (dvRef.current as any)[key] = handler;
      }
    });

    return () => {
      if (dvRef.current) {
        Object.keys(eventHandlers).forEach(key => {
          delete (dvRef.current as any)[key];
        });
      }
    }

  }, [eventHandlers]);

  useImperativeHandle(ref, () => ({
    get dateFilter() {
      return dvRef.current?.dateFilter;
    },
    get filters(): DashboardFilters | undefined {
      return dvRef.current?.filters;
    },
    getRVDashboard: () => dvRef.current?.getRVDashboard(),
    refreshData: () => dvRef.current?.refreshData(),
  }));
  
  return <div id={uniqueId} ref={revealViewReference} style={combinedStyle}></div>;
});
