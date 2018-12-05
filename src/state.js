import pako from 'pako'

export function serialize(state) {
  return btoa(pako.deflate(JSON.stringify(state), { to: 'string' }))
}

export function deserialize(string) {
  return JSON.parse(pako.inflate(atob(string), { to: 'string' }))
}
