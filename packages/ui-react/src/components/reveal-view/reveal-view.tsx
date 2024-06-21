import React from 'react';
import {createComponent} from '@lit/react';
import { RvRevealView as Component } from '@revealbi/ui';

export type RvRevealViewRef = InstanceType<typeof Component>;

export const RvRevealView = createComponent({
  tagName: 'rv-reveal-view',
  elementClass: Component,
  react: React,
});