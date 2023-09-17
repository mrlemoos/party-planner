import { useCallback } from "react";

import { useAtom, type ExtractAtomValue } from "jotai";

import UserAvatarAppearanceAtom from "@root/store/UserAvatarAppearanceAtom";

// #region Interfaces & Types

type UserAvatarAppearanceState = ExtractAtomValue<typeof UserAvatarAppearanceAtom>[string];

interface GetUserAvatarAppearanceOptions {
  orDefaultsTo: UserAvatarAppearanceState | "random";
}

interface GetUserAvatarAppearance {
  (userId: string, options: GetUserAvatarAppearanceOptions): UserAvatarAppearanceState;
}

// #endregion

// #region Utilities & Constants

const avatarColorMatches = [
  {
    backgroundColor: /* lavender */ "#cdb4db",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#ffc8dd",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#ffafcc",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#bde0fe",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#a2d2ff",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#023e8a",
    foregroundColor: "#fff",
  },
  {
    backgroundColor: "#03045e",
    foregroundColor: "#fff",
  },
  {
    backgroundColor: "#caf0f8",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#bbd0ff",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#b8c0ff",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#c8b6ff",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#e2afff",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#ffd6ff",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#ef476f",
    foregroundColor: "#fff",
  },
  {
    backgroundColor: "#ffd166",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#f72585",
    foregroundColor: "#fff",
  },
  {
    backgroundColor: "#9e0059",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#461220",
    foregroundColor: "#fff",
  },
  {
    backgroundColor: "#00296b",
    foregroundColor: "#fff",
  },
  {
    backgroundColor: "#3a0ca3",
    foregroundColor: "#fff",
  },
  {
    backgroundColor: "#3c096c",
    foregroundColor: "#fff",
  },
  {
    backgroundColor: "#daffef",
    foregroundColor: "#000",
  },
  {
    backgroundColor: "#1dd3b0",
    foregroundColor: "#000",
  },
];

function $getRandomAvatarColorMatch() {
  const randomIndex = Math.floor(Math.random() * avatarColorMatches.length);
  return avatarColorMatches[randomIndex];
}

// #endregion

export default function useCachedUserAvatarAppearance() {
  const [avatarAppearanceByUserId, cacheAvatarAppearance] = useAtom(UserAvatarAppearanceAtom);

  const getUserAvatarAppearance = useCallback<GetUserAvatarAppearance>(
    (userId, { orDefaultsTo }) => {
      const cachedAvatarConfiguration = avatarAppearanceByUserId[userId];

      if (cachedAvatarConfiguration) {
        return cachedAvatarConfiguration;
      }

      const defaultAvatarConfiguration = orDefaultsTo === "random" ? $getRandomAvatarColorMatch() : orDefaultsTo;

      cacheAvatarAppearance((previous) => ({
        ...previous,
        [userId]: defaultAvatarConfiguration,
      }));

      return defaultAvatarConfiguration;
    },
    [avatarAppearanceByUserId, cacheAvatarAppearance]
  );

  return { getUserAvatarAppearance };
}
