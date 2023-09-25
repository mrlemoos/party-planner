import cls from 'classnames';

import RobotoMono from '@root/styles/RobotoMono';

export default function Description(): JSX.Element {
  return (
    <div className="mx-auto max-w-[250px] md:max-w-[600px] mt-3 flex flex-col items-center">
      <h2 className="text-gray-700 dark:text-gray-300 text-center sm:text-xs">
        You&rsquo;ve been crowned the{' '}
        <span className="font-semibold underline">owner</span> of the party. 👑
      </h2>
      <h3 className="mt-4 hidden md:block">
        Copy the&nbsp;
        <span
          className={cls(
            RobotoMono.className,
            'text-red-500 font-bold bg-gray-700 text-sm p-1 text-center',
          )}
        >
          Party ID Link
        </span>
        &nbsp; below and share it with your scrummates!
      </h3>
    </div>
  );
}
