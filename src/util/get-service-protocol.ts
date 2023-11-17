import HttpProtocol from './http-protocol'

/**
 * Returns the HTTP/HTTP(S) protocol of the generated deployment URL.
 */
function getServiceProtocol() {
  return process.env.NODE_ENV === 'production' ? HttpProtocol.HTTPS : HttpProtocol.HTTP
}

export default getServiceProtocol
