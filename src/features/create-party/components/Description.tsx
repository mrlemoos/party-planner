import cls from 'classnames';

import RobotoMono from '@root/styles/RobotoMono';

export default function Description(): JSX.Element {
  return (
    <div className="mx-auto mt-3 flex max-w-[250px] flex-col items-center md:max-w-[600px]">
      <h2 className="text-center text-gray-700 dark:text-gray-300 sm:text-xs">
        You&rsquo;ve been crowned the{' '}
        <span className="font-semibold underline">owner</span> of the party. 👑
      </h2>
      <h3 className="mt-4 hidden md:block">
        Copy the&nbsp;
        <span
          className={cls(
            RobotoMono.className,
            'bg-gray-700 p-1 text-center text-sm font-bold text-red-500',
          )}
        >
          Party ID Link
        </span>
        &nbsp; below and share it with your scrummates!
      </h3>
    </div>
  );
}
