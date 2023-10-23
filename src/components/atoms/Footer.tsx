import { type JSX } from 'react';

import cls from 'classnames';

import Poppins from '@root/styles/Inter';

function Footer(): JSX.Element {
  return (
    <div className="mt-20 h-[250px] w-screen bg-gradient-to-b from-gray-100 to-purple-100 dark:from-dark-coal dark:to-black">
      <div className="container mx-auto">
        <div className="flex h-full items-end justify-center px-4 pt-3">
          <span className="text-sm text-black dark:text-white">
            <span className={cls(Poppins.className, 'font-semibold')}>
              Party Planner 🎉
            </span>
            &nbsp; &copy; 2023
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
