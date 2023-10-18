import { CSSProperties, type JSX } from 'react';

import Badge from '@root/components/atoms/Badge';
import ListItem from '@root/components/atoms/ListItem';

const BADGE_STYLE: CSSProperties = {
  position: 'absolute',
  bottom: -32,
  right: 0,
};

function PointTicketsBanner(): JSX.Element {
  return (
    <section className="flex flex-col">
      <h2 className="text-xl font-semibold mb-3 text-white">Point Tickets</h2>
      <ul>
        <ListItem>
          <span className="text-lg">Fibonacci</span>
        </ListItem>
      </ul>
    </section>
  );
}

export default PointTicketsBanner;
