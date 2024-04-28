import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { clientInstance } from '~/services/axios'

export default function useSocket() {
    const [socket, setSocket] = useState<Socket | null>(null)

    const connect = () => {
        const token = clientInstance.getAccessToken()
        if (!token) {
            return
        }

        // const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', {
        // 	query: { token: token },
        // })

        // setSocket(socket)
    }

    useEffect(() => {
        connect()

        return () => {
            if (!socket) {
                return
            }
            socket.disconnect()
        }
    }, [])

    return { socket, connect }
}
