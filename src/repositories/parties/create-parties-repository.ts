import FirebaseAdminService from '@root/services/firebase-admin-service'

import FirebasePartiesRepository from '../_/firebase/firebase-parties-repository'

import PartiesRepository from './parties-repository'

function createPartiesRepository(): PartiesRepository {
  return new FirebasePartiesRepository(new FirebaseAdminService())
}

export default createPartiesRepository
