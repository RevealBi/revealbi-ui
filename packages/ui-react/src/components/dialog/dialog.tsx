import React from 'react';
import {createComponent} from '@lit/react';
import { RvDialog as Component } from '@revealbi/ui';

export type RvDialogRef = InstanceType<typeof Component>;

export const RvDialog = createComponent({
  tagName: 'rv-dialog',
  elementClass: Component,
  react: React,
});
