import { style } from '@vanilla-extract/css';

import toRem from '@root/util/toRem';

export const headingTextRootClassName = style([
  'font-normal',
  'flex',
  'flex-col',
  'text-3xl',
  {
    '@media': {
      [`screen and (max-width: ${toRem(600)})`]: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
]);
