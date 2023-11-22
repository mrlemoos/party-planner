export default class UserCollaborationMetadataByUserIdNotFoundException extends Error {
  constructor(userId: string) {
    super(
      `UserCollaborationMetadata could not be found with the given userId: "${userId}". Do you mean to use the fetchUserCollaborationMetadataBy() method?`,
    )
  }
}
