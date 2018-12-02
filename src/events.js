const bus = Object.create(null)

export function on(eventName, callback) {
  bus[eventName] = bus[eventName] || []
  bus[eventName].push(callback)
}

export function emit(eventName, payload) {
  bus[eventName] && bus[eventName].forEach(callback => callback(payload))
}
