import React from 'react';
import {createComponent} from '@lit/react';
import { RvVisualizationViewer as Component } from '@revealbi/ui';

export type RvVisualizationViewerRef = InstanceType<typeof Component>;

export const RvVisualizationViewer = createComponent({
  tagName: 'rv-visualization-viewer',
  elementClass: Component,
  react: React,
});