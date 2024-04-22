'use client'

import { ProductComment } from '~/interfaces/product.type'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import dayjs from 'dayjs'
import styles from '~/styles/product_detail.module.scss'
import { useState } from 'react'
import { useAuth } from '~/stores/auth'
import { useRouter } from 'next/navigation'

type Props = {
    comment: ProductComment
}

function CommentItem({ comment }: Props) {
    const [isLike, setIsLike] = useState(false)
    const [isShowMore, setIsShowMore] = useState(false)
    const [isShowReply, setIsShowReply] = useState(false)
    const [replyInput, setReplyInput] = useState('')
    const { isLogin, avatar } = useAuth()
    const router = useRouter()

    const handleClearReply = () => {
        setReplyInput('')
        setIsShowReply(false)
    }

    const handleShowReply = () => {
        if (!isLogin) {
            router.push('/login')
        } else {
            setIsShowReply(true)
        }
    }

    const handleLikeComment = () => {
        if (!isLogin) {
            router.push('/login')
        } else {
            setIsLike((prev) => !prev)
        }
    }

    return (
        <>
            <div className={styles.comment}>
                <img src={'/images/default_user.png'} alt="user avatar" />
                <div className={styles['comment__content']}>
                    <div>
                        <span className={styles.username}>Anonymous user</span>
                        <span className={styles.date}>
                            {dayjs(comment?.createdAt).format('DD/MM/YYYY')}
                        </span>
                    </div>
                    <p>
                        {isShowMore ? comment?.content : comment.content.substring(0, 100)}
                        {comment?.content.length > 100 && (
                            <button onClick={() => setIsShowMore((prev) => !prev)}>
                                {isShowMore ? '...\nShow less' : '...\nShow more'}
                            </button>
                        )}
                    </p>
                    <div>
                        <div className="flex items-center gap-2">
                            <button onClick={handleLikeComment}>
                                {isLike ? (
                                    <ThumbUpIcon className="text-md" />
                                ) : (
                                    <ThumbUpAltOutlinedIcon className={styles.icon} />
                                )}
                            </button>
                            <button className={styles.reply} onClick={handleShowReply}>
                                Reply
                            </button>
                        </div>
                        {isShowReply && (
                            <div>
                                <div className="mt-2 flex items-center gap-4">
                                    <img
                                        src={avatar || '/images/default_user.png'}
                                        alt="user avatar"
                                    />
                                    <input
                                        className={styles['reply_input']}
                                        spellCheck={false}
                                        type="text"
                                        autoFocus
                                        placeholder="Thêm phản hồi..."
                                        value={replyInput}
                                        onChange={(event) => setReplyInput(event.target.value)}
                                    />
                                </div>
                                <div className={styles['reply__controls']}>
                                    <button onClick={handleClearReply}>Cancel</button>
                                    <button className={styles.btn}>Reply</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button className={styles.option}>
                    <MoreVertIcon className={styles.icon} />
                </button>
            </div>
        </>
    )
}

export default CommentItem
