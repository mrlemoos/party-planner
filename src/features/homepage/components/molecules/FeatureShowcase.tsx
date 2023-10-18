/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import { type ReactNode, type JSX, type HTMLAttributes } from 'react';

import cls from 'classnames';

import { showcaseContainer, eyeCatcher } from './FeatureShowcase.css';

type HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>;
type OmittedHTMLDivElementAttributes = Omit<
  HTMLDivElementAttributes,
  'children' | 'content' | 'defaultChecked' | 'checked'
>;

interface FeatureShowcaseProps extends OmittedHTMLDivElementAttributes {
  /**
   * The custom {@link ReactNode} that represents the feature header. In the
   * component, it is rendered as a heading and positioned above the
   * {@link description}.
   *
   * @see {@link ReactNode}
   * @see {@link description}
   */
  header: ReactNode;
  /**
   * The custom {@link ReactNode} that represents the feature description. In
   * the component, it is rendered as a paragraph and positioned below the
   * {@link header}.
   *
   * @see {@link ReactNode}
   * @see {@link header}
   */
  description: ReactNode;
  /**
   * The custom {@link ReactNode} that represents the feature showcase in a
   * visual way (e.g. an icon or image). As the `<FeatureShowcase>` component
   * makes usage of the composition technique, the `children` prop is required,
   * as well as the other props to compose the `JSX` (i.e. {@link description}
   * and {@link header}).
   *
   * This is positioned on the left side of the component.
   *
   * @see {@link ReactNode}
   */
  children: ReactNode;
}

/**
 * The `<FeatureShowcase>` is the composition-orientated component that
 * represents a feature showcase in the homepage. It is composed by a
 * {@link header}, {@link description} and {@link children} props that are
 * established by {@link FeatureShowcaseProps}.
 */
function FeatureShowcase({
  header,
  description,
  children,
}: FeatureShowcaseProps): JSX.Element {
  return (
    <div
      className={cls(
        'flex items-center m-8',
        showcaseContainer,
        'hover:scale-150'
      )}
    >
      <div className={eyeCatcher}>{children}</div>
      <div className="ml-8">
        <h3 className="text-xl font-semibold mb-4">{header}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default FeatureShowcase;
