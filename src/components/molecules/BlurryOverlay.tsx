"use client";

import { useEffect, type CSSProperties, type ComponentProps } from "react";

import Blur from "@root/components/atoms/Blur";

type BlurryOverlayProps = ComponentProps<typeof Blur>;

function BlurryOverlay({ children, className, style = {}, ...props }: BlurryOverlayProps): JSX.Element {
  const combinedStyle: CSSProperties = {
    ...style,
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    filter: "blur(24px)",
  };

  useEffect(() => {
    function handleWheel(event: Event) {
      event.preventDefault();
    }

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <Blur {...props} className={className} style={combinedStyle}>
      {children}
    </Blur>
  );
}

export default BlurryOverlay;
