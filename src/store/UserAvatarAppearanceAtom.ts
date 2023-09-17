import { atom } from "jotai";

interface UserAvatarAppearanceAtomState {
  [userId: string]: {
    backgroundColor: string;
    foregroundColor: string;
  };
}

const UserAvatarAppearanceAtom = atom<UserAvatarAppearanceAtomState>({});

export default UserAvatarAppearanceAtom;
