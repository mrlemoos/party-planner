import { type ComponentPropsWithoutRef } from 'react'

import { SignUp as ClerkSignUp } from '@clerk/nextjs'
import colors from 'tailwindcss/colors'

import toRem from '@root/util/to-rem'
import FontSans from '@root/styles/fonts/font-sans'

const ClerkTheme: ComponentPropsWithoutRef<typeof ClerkSignUp>['appearance'] = {
  layout: {
    showOptionalFields: false,
    logoPlacement: 'none',
    logoLinkUrl: '/',
    socialButtonsPlacement: 'bottom',
    termsPageUrl: '/terms-and-conditions',
  },
  variables: {
    colorPrimary: colors.black,
    colorBackground: colors.white,
    colorDanger: colors.red[500],
    colorInputBackground: colors.gray[100],
    borderRadius: toRem(6),
    colorInputText: colors.black,
    fontFamily: FontSans.style.fontFamily,
    fontFamilyButtons: FontSans.style.fontFamily,
    colorText: colors.black,
    colorTextSecondary: colors.gray[500],
  },
  elements: {
    formButtonPrimary: {
      textTransform: 'unset !important',
    },
  },
}

export default ClerkTheme
