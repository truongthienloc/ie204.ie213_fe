import ClientRequest from './ClientRequest'

export const clientInstance = ClientRequest.getInstance()
export const api = clientInstance.getClient()
