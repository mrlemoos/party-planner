import FirebasePartiesRepository from './FirebasePartiesRepository';
import type PartiesRepository from './PartiesRepository';

export default function createPartiesRepository(): PartiesRepository {
  return new FirebasePartiesRepository();
}
