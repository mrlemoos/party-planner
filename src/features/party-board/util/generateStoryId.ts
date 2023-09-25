import uuid from '@root/util/uuid';

export default function generateStoryId() {
  return `$$story$$__${uuid()}`;
}
