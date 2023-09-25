import { useMemo } from 'react';

import convertFromObjectWithPrefix from '@root/util/convertFromObjectWithPrefix';

// #region Interfaces & Types

interface UseDeconstructedMap<T extends string, P extends object> {
  prefix: T;
  props: P;
}

// #endregion

function useDeconstructedMemo<
  U extends any[],
  T extends string = string,
  P extends object = Record<string, unknown>,
>(maps: UseDeconstructedMap<T, P>[]) {
  return useMemo(
    () =>
      maps.map(({ prefix, props }) =>
        convertFromObjectWithPrefix(props, prefix),
      ),
    [maps],
  ) as U;
}

export default useDeconstructedMemo;
