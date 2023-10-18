import { style } from '@vanilla-extract/css';

import toRem from '@root/util/toRem';

export const concept = style({
  minHeight: toRem(500),
  minWidth: toRem(600),

  position: 'absolute',
  top: 400,
  right: 0,

  borderTopLeftRadius: toRem(12),
  borderBottomLeftRadius: toRem(12),

  padding: toRem(32),
});
