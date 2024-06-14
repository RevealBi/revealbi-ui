import { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { VisualizationViewer as Viewer, VisualizationViewerOptions } from '@revealbi/ui';
import styles from './visualization-viewer.module.scss';

/* eslint-disable-next-line */
export interface VisualizationViewerProps {
  dashboard?: string | unknown;
  options?: VisualizationViewerOptions;
  style?: CSSProperties;
  visualization?: string | number;
}

export function VisualizationViewer(props: VisualizationViewerProps) {

  const { dashboard, options, style, visualization } = props;

  const defaultStyle: CSSProperties = { height: '100%', width: '100%', position: 'relative', minHeight: '250px' };
  const combinedStyle: CSSProperties = { ...defaultStyle, ...style }; // Merge with user-provided styles
  const uniqueId = useMemo(() => `revealView-${Math.random().toString(36).substr(2, 9)}`, []);  
  const dvRef = useRef<Viewer | null>(null);
  const revealViewReference = useRef(null);

  useEffect(() => {
    if (!dvRef.current && revealViewReference.current) {
      dvRef.current = new Viewer(revealViewReference.current, dashboard, visualization, options);
    }

    return () => {
      dvRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    if (dvRef.current) {
      dvRef.current.updateOptions(options);
      dvRef.current.updateDashboard(dashboard, visualization);
    }
  }, [dashboard, options]);

  useEffect(() => {
    if (dvRef.current) {
      dvRef.current.updateVisualization(visualization);
    }
  }, [visualization]);

  return <div id={uniqueId} ref={revealViewReference} style={combinedStyle}></div>;
}

export default VisualizationViewer;
