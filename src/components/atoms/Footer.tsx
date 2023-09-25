import { type JSX } from 'react';

import cls from 'classnames';

import Poppins from '@root/styles/Inter';

function Footer(): JSX.Element {
  return (
    <div className="w-screen h-[250px] bg-gradient-to-b from-gray-100 to-purple-100 dark:from-dark-coal dark:to-black mt-20">
      <div className="container mx-auto">
        <div className="flex justify-center items-end px-4 pt-3 h-full">
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
