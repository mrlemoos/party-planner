import FirebaseClientService from '@root/services/firebase-client-service'

import FirebasePartiesRepository from '../_/firebase/firebase-parties-repository'
import createUserCollaborationMetadataRepository from '../user/collaboration-metadata/create-user-collaboration-metadata-repository'

import PartiesRepository from './parties-repository'

function createPartiesRepository(): PartiesRepository {
  return new FirebasePartiesRepository(new FirebaseClientService(), createUserCollaborationMetadataRepository())
}

export default createPartiesRepository
