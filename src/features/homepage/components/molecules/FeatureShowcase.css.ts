import { style } from '@vanilla-extract/css';

import toRem from '@root/util/toRem';

export const showcaseContainer = style({
  margin: toRem(32),
});

export const eyeCatcher = style({
  marginBlock: toRem(16),
  marginInline: toRem(28),
});
