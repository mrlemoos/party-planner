import { PrismaClient } from '@prisma/client'

import ConstructorNotAllowedException from '@root/exceptions/constructor-not-allowed-exception'

declare global {
  // We disable the next line because we need to declare a global variable for the Prisma ORM. This is a Best Practice
  // recommendation from Prisma itself to avoid creating multiple instances of the Prisma Client while in development
  // mode. Reference: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  globalThis.prisma = new PrismaClient()
  console.log(' ○ Prisma ORM instantiated for production environment. (PrismaService)')
} else if (!globalThis.prisma) {
  globalThis.prisma = new PrismaClient()
  console.log(' ○ Prisma ORM instantiated for non-production environment. (PrismaService)')
} else {
  console.log(' ○ Prisma ORM already instantiated. (PrismaService)')
}

/**
 * The service layer for the Prisma ORM. This service is responsible for creating and managing the
 * {@link PrismaClient | Prisma ORM}.
 */
export default class PrismaService {
  private constructor() {
    throw new ConstructorNotAllowedException(this.constructor.name)
  }

  /**
   * Returns the {@link global.prisma | singleton} instance of the {@link PrismaClient | Prisma ORM}. If the
   * {@link global.prisma | singleton} instance does not exist, it will be created.
   */
  static client(): PrismaClient {
    const prisma = global.prisma ?? new PrismaClient()
    return prisma
  }
}
