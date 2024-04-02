import { ChangeEventHandler, FocusEventHandler, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import styles from '../../styles/form.module.scss'

type InputProps = {
    placeholder?: string
    id?: string
    name?: string
    type: string
    className?: string
    value: string
    handleOnFocus?: FocusEventHandler<HTMLInputElement>
    handleOnChange?: ChangeEventHandler<HTMLInputElement>
}

function InputField({
    type,
    placeholder,
    className,
    name,
    value,
    id,
    handleOnFocus = () => {},
    handleOnChange = () => {},
}: InputProps) {
    const [isShowContent, setIsShowContent] = useState<boolean>(false)

    return (
        <>
            <div className={`${styles.input} ${className}`}>
                <input
                    type={type === 'password' && isShowContent ? 'text' : type}
                    id={id}
                    spellCheck={false}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    value={value}
                />
                {type === 'password' && (
                    <div
                        className={styles.showContentBtn}
                        onClick={() => setIsShowContent(!isShowContent)}
                    >
                        {isShowContent ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </div>
                )}
            </div>
        </>
    )
}

export default InputField
