const getClientURL = () => {
  if ('window' in global && global.window) {
    const curr = global.window.location;
    const location = new URL(curr.href);

    location.search = '';
    location.pathname = '';

    return location.toString();
  }

  return process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000';
};

export default getClientURL;
