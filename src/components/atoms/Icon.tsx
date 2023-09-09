import { type ReactElement, type ComponentProps, useMemo } from "react";

import Outline_DocumentClipboardCheck from "@root/icons/outline/DocumentClipboardCheck";
import Outline_DocumentClipboardList from "@root/icons/outline/DocumentClipboardList";
import Solid_ExclamationCircle from "@root/icons/solid/ExclamationCircle";
import Mini_XMark from "@root/icons/mini/XMark";

const icons = {
  // #region Outline icons
  "Outline Document Clipboard Check": Outline_DocumentClipboardCheck,
  "Outline Document Clipboard List": Outline_DocumentClipboardList,
  // #endregion

  // #region Solid icons
  "Solid Exclamation Circle": Solid_ExclamationCircle,
  // #endregion

  // #region Mini icons
  "Mini XMark": Mini_XMark,
  // #endregion
};

type IconProps =
  // #region Outline icons
  | (ComponentProps<typeof Outline_DocumentClipboardCheck> & {
      name: "Outline Document Clipboard Check";
    })
  | (ComponentProps<typeof Outline_DocumentClipboardList> & {
      name: "Outline Document Clipboard List";
    })
  // #endregion
  // #region Solid icons
  | (ComponentProps<typeof Solid_ExclamationCircle> & {
      name: "Solid Exclamation Circle";
    })
  // #endregion
  // #region Mini icons
  | (ComponentProps<typeof Mini_XMark> & {
      name: "Mini XMark";
    });
// #endregion

const Icon = ({ name, className, ...props }: IconProps): ReactElement => {
  const ComponentByType = useMemo(() => {
    const Component = icons[name];

    return Component;
  }, [name]);

  return <ComponentByType {...props} />;
};

export default Icon;
