import React, { useId } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

type Props = {
    isOpen: boolean
    onClose: () => void
    tablePosition?: string
    tableFloor?: string
    floorOptions?: string[]
    onChangeTablePosition?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeTableFloor?: (e: any, value: string | null) => void
    onSubmit?: () => void
}

export default function AddTableModal({
    isOpen,
    onClose,
    tablePosition,
    onChangeTablePosition,
    tableFloor,
    floorOptions,
    onChangeTableFloor,
    onSubmit,
}: Props) {
    const tablePosId = useId()
    const tableFloorId = useId()

    if (!isOpen) return null
    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                <div className="relative my-6">
                    {/*content*/}
                    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex  justify-center border-b border-solid p-5">
                            <h3 className="text-2xl font-medium text-primary ">Thêm bàn</h3>
                        </div>
                        {/*body*/}
                        <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-7 px-7">
                            {/* <div className="flex items-center gap-8 text-lg"> */}
                            <label className="" htmlFor={tablePosId}>
                                Tên bàn:
                            </label>
                            <input
                                type="text"
                                className="h-[40px] w-[250px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                id={tablePosId}
                                value={tablePosition}
                                onChange={onChangeTablePosition}
                            />
                            <label className="" htmlFor={tableFloorId}>
                                Vị trí:
                            </label>
                            <Autocomplete
                                id={tableFloorId}
                                options={floorOptions ?? []}
                                value={tableFloor}
                                onChange={onChangeTableFloor}
                                freeSolo
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input
                                            {...params.inputProps}
                                            type="text"
                                            className="h-[40px] w-[250px] rounded-lg border-2 border-primary px-3 focus:outline-none"
                                        />
                                    </div>
                                )}
                            />
                            {/* </div> */}
                        </div>
                        {/*footer*/}
                        <div className="mt-4 flex items-center justify-end rounded-b border-t border-solid p-6">
                            <button
                                className=" background-transparent mb-1 mr-4 border-2 border-primary bg-white  px-6 py-2 text-sm font-bold uppercase text-primary 
									outline-none transition-all duration-150 ease-linear hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                type="button"
                                onClick={onClose}
                            >
                                Hủy
                            </button>
                            <button
                                className="mb-1 mr-1  rounded-lg border-2 border-primary bg-white px-4 py-2 text-sm font-bold uppercase text-primary outline-none transition-all  duration-150 ease-linear hover:border-primary hover:bg-primary hover:text-white focus:outline-none"
                                type="button"
                                onClick={onSubmit}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
    )
}
