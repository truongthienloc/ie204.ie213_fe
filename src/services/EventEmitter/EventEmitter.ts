export default class EventEmitter {
    private listeners: Map<string, ((args: any) => void)[]> = new Map()

    public emit<T>(name: string, args: T): void {
        const callbacks = this.listeners.get(name)

        if (callbacks) {
            for (const callback of callbacks) {
                callback(args)
            }
        }
    }

    public on(name: string, callback: (args: any) => void): void {
        const callbacks = this.listeners.get(name)
        if (callbacks) {
            callbacks.push(callback)
            return
        }
        this.listeners.set(name, [callback])
    }

    public off(name: string, callback: (args: any) => void): void {
        const callbacks = this.listeners.get(name)
        if (!callbacks) {
            return
        }
        const newCallbacks = callbacks.filter((c) => c !== callback)
        this.listeners.set(name, newCallbacks)
    }
}
