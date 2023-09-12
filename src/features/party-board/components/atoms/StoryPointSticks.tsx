import { useMemo, type JSX } from "react";

import cls from "classnames";

interface StoryPointSticksProps {
  totalStoryPoints: number;
}

export default function StoryPointSticks({ totalStoryPoints }: StoryPointSticksProps): JSX.Element {
  const storyPointSticks = useMemo(
    () => Array.from({ length: totalStoryPoints }, (_, index) => index + 1),
    [totalStoryPoints]
  );

  return (
    <div className={cls("flex justify-center items-center flex-wrap gap-1")}>
      {storyPointSticks.map((value) => (
        <div key={`${totalStoryPoints}-${value}`} className="h-3 bg-coal" style={{ width: 1 }}>
          &nbsp;
        </div>
      ))}
    </div>
  );
}
