import { Fragment } from 'react';

import TopBar from '@root/components/molecules/TopBar';
// import TextAnchor from "@root/components/atoms/TextAnchor";

function RootPage(): JSX.Element {
  return (
    <Fragment>
      <TopBar>
        {/* <div className="flex flex-row justify-between items-center gap-6">
          <TextAnchor
            href="/pricing"
            target="_self"
            className="bg-white dark:bg-black rounded-t-md"
          >
            Pricing
          </TextAnchor>
          <TextAnchor
            href="/contacts"
            target="_self"
            className="bg-white dark:bg-black rounded-t-md"
          >
            Contact
          </TextAnchor>
        </div> */}
      </TopBar>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        consequatur suscipit aliquam rerum, eum, quam unde totam maiores
        reiciendis libero sapiente temporibus odio aliquid commodi officiis
        repellendus quaerat, laudantium rem nihil. Consectetur ex quae
        cupiditate quos nihil illo earum sit laboriosam quidem ut adipisci
        aperiam optio, odit architecto velit dignissimos a quas error enim,
        dolores cum consequatur pariatur excepturi ad! Dignissimos sint
        distinctio voluptatum asperiores, nobis odio. Ullam officiis doloremque
        deserunt quaerat, error blanditiis sapiente cumque laborum maiores,
        perferendis quidem praesentium ad iure excepturi iste repudiandae
        expedita voluptatum corporis. Officia non consectetur cum quidem
        cupiditate excepturi similique dolores optio dolorum!
      </div>
    </Fragment>
  );
}

export default RootPage;
