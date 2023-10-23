import { type JSX } from 'react';

import FakeUserAvatar from '../atoms/FakeUserAvatar';

// #region Constants & Utilities

const MEDIUM_PURPLE_COLOR = 'rgb(168 85 247)';
const TOMATO_COLOR = 'rgb(255 107 107)';
const GREEN_COLOR = 'rgb(0 214 89)';
const BLUE_COLOR = 'rgb(0 174 255)';

const FAKE_USER_AVATAR_COLORS = [
  MEDIUM_PURPLE_COLOR,
  TOMATO_COLOR,
  GREEN_COLOR,
  BLUE_COLOR,
];

const FAKE_USERS = [
  { username: 'Jeff Sutherland', comment: 'This is art!' },
  {
    username: 'Ken Schwaber',
    comment: 'I’d say we can build this in Thirty Days.',
  },
  {
    username: 'Robert Martin',
    comment: 'That‘s a good concept, solid I‘d call it.',
  },
  {
    username: 'Martin Fowler',
    comment: 'I just had a thought, and you know, it works!',
  },
];

const TRANSITION_DELAY_BASIS = 0.5;
const TRANSITION_DURATION_BASIS = 0.5;

// #endregion

function CollaborationBanner(): JSX.Element {
  return (
    <section className="flex flex-col">
      <h2 className="mb-3 text-2xl font-semibold text-white">Collaboration</h2>
      <span className="text-white">
        Get your team aligned with realtime collaboration.
      </span>

      <br />

      <div className="relative flex flex-col items-center">
        {FAKE_USERS.map(({ username, comment }, pos) => {
          const backgroundColor = FAKE_USER_AVATAR_COLORS[pos];

          return (
            <div key={username} className="absolute">
              <FakeUserAvatar
                backgroundColor={backgroundColor}
                comment={comment}
                delayBasis={TRANSITION_DELAY_BASIS}
                durationBasis={TRANSITION_DURATION_BASIS}
                position={pos}
              >
                {username}
              </FakeUserAvatar>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CollaborationBanner;
