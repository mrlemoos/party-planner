import type UserCollaborationMetadataModel from './user-collaboration-metadata-model'

/**
 * @internal
 *
 * Remembered props from {@link UserCollaborationMetadataModel}.
 */
type RememberedUserCollaborationMetadataModel = Omit<UserCollaborationMetadataModel, 'createdAt' | 'updatedAt'>

interface PartyMemberModel extends RememberedUserCollaborationMetadataModel {
  createdAt: string
  updatedAt: string
}

export default PartyMemberModel
