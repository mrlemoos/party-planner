import cls from 'classnames';

import Poppins from '@root/styles/Poppins';

export default function Title(): JSX.Element {
  return (
    <h1 className={cls(Poppins.className, 'text-2xl font-semibold')}>
      Let&rsquo;s start the party 🎉
    </h1>
  );
}
