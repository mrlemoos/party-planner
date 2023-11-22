import { PrismaClient } from '@prisma/client'

import ConstructorNotAllowedException from '@root/exceptions/constructor-not-allowed-exception'

/**
 * The service layer for the Prisma ORM. This service is responsible for creating and managing the
 * {@link PrismaClient | Prisma ORM}.
 */
export default class PrismaService {
  /**
   * The instance of the {@link PrismaClient | Prisma ORM} that is used throughout the application.
   */
  private static singletonClient: PrismaClient

  private constructor() {
    throw new ConstructorNotAllowedException(this.constructor.name)
  }

  /**
   * Returns the singleton instance of the {@link PrismaClient | Prisma ORM}. If the singleton instance does not exist,
   * it will be created.
   */
  static client(): PrismaClient {
    PrismaService.singletonClient ??= new PrismaClient()

    return PrismaService.singletonClient
  }
}
