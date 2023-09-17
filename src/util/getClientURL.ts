const getClientURL = () => {
  if ("window" in global && global.window) {
    // @ts-expect-error The window object is only available in the browser, this
    // is a client-only runtime check.
    const location$ = global.window.location;
    return location$.hostname;
  }

  return process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";
};

export default getClientURL;
