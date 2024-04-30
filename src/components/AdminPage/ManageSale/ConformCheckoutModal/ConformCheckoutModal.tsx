import React from 'react'
import { Modal, ModalButton } from '~/components/Modal'

type Props = {
    isOpen: boolean
    id?: string
    customerName?: string
    onClose?: () => void
    onSubmit?: () => void
}

export default function ConformCheckoutModal({
    isOpen,
    id,
    customerName,
    onClose,
    onSubmit,
}: Props) {
    return (
        <Modal
            title="Xác nhận thanh toán"
            className="[&_.title]:text-center"
            onClose={onClose}
            buttons={
                <>
                    <ModalButton
                        className="bg-red-500 hover:border-red-500 hover:text-red-500"
                        label="Hủy"
                        onClick={onClose}
                    />
                    <ModalButton
                        className="bg-blue-500 hover:border-blue-500 hover:text-blue-500"
                        label="Xác nhận"
                        onClick={onSubmit}
                    />
                </>
            }
            open={isOpen}
        >
            <p className="p-4 [&_strong]:text-primary">
                Bạn có chắc muốn xác nhận thanh toán đơn hàng <strong>{id}</strong> của khách hàng{' '}
                <strong>{customerName}</strong> không?
            </p>
        </Modal>
    )
}
