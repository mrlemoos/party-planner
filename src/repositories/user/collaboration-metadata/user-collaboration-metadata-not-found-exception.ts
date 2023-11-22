export default class UserCollaborationMetadataNotFoundException extends Error {
  constructor(userCollaborationId: string) {
    super(
      `UserCollaborationMetadata could not be found with the given id "${userCollaborationId}". Do you mean to use the fetchUserCollaborationMetadataByUserId() method?`,
    )
  }
}
