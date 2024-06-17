import React from 'react';
import {createComponent} from '@lit/react';
import { RvDialog as Component } from '@revealbi/ui';

//we can create a wrapper component type to make the react API a little eaiser to use
export type RvDialogRef = Component

export const RvDialog = createComponent({
  tagName: 'rv-dialog',
  elementClass: Component,
  react: React,
});

export default RvDialog;
