"use client";

import { type ReactNode, type ReactElement, Fragment } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  anchor?: HTMLElement | null;
}

const Portal = ({ children, anchor }: PortalProps): ReactElement => <Fragment>{createPortal(children, anchor || document.body)}</Fragment>;

export default Portal;
