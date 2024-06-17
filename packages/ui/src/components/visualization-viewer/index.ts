import { RvVisualizationViewer } from "./visualization-viewer.component";

export * from "./visualization-viewer.component";
export default RvVisualizationViewer;

RvVisualizationViewer.define('rv-visualization-viewer');

declare global {
  interface HTMLElementTagNameMap {
    'rv-visualization-viewer': RvVisualizationViewer;
  }
}