import { NextResponse } from 'next/server'

import UniversalCookies from '@root/constants/universal-cookies'

interface WriteAuthorizationCookiesOptions {
  /**
   * The user ID of the user.
   */
  userId: string
  /**
   * The access token of the user.
   */
  accessToken: string
  /**
   * The display name of the user.
   */
  displayName?: string
  /**
   * The email address of the user.
   */
  emailAddress?: string
}

/**
 * A constant for the maximum age of a cookie that corresponds to one week.
 */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7

/**
 * Write the cookies to the {@link NextResponse response} object with the given data such as userId, accessToken,
 * displayName and emailAddress.
 */
function writeAuthorizationCookies<E>(
  response: NextResponse<E>,
  { userId, accessToken, displayName, emailAddress }: WriteAuthorizationCookiesOptions,
) {
  response.cookies.set(UniversalCookies.user.id, userId, {
    path: '/',
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
  })
  response.cookies.set(UniversalCookies.accessToken, accessToken, {
    path: '/',
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
  })
  if (displayName) {
    response.cookies.set(UniversalCookies.user.displayName, displayName, {
      path: '/',
      httpOnly: true,
      maxAge: COOKIE_MAX_AGE,
    })
  }
  if (emailAddress) {
    response.cookies.set(UniversalCookies.user.emailAddress, emailAddress, {
      path: '/',
      httpOnly: true,
      maxAge: COOKIE_MAX_AGE,
    })
  }
}

export default writeAuthorizationCookies
