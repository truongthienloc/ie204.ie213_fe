'use client'
import SendIcon from '@mui/icons-material/Send'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import CommentItem from './CommentItem'
import { ProductComment } from '~/interfaces/product.type'
import styles from '~/styles/product_detail.module.scss'
import { useAuth } from '~/stores/auth'

type Props = {
    initComments: ProductComment[]
}

function CommentSection({ initComments }: Props) {
    const [commentInput, setCommentInput] = useState('')
    const [comments, setComments] = useState<ProductComment[]>([])
    const { avatar, username, isLogin } = useAuth()
    const router = useRouter()

    useEffect(() => {
        setComments(initComments)
    }, [initComments])

    const handleAddComment = () => {
        if (!isLogin) {
            router.push('/login')
            return
        } else {
            // logic add new comment with api
        }
    }

    return (
        <>
            <div className={styles['comment__container']}>
                <h2 className={styles['sub-title']}>Đánh giá sản phẩm ({comments.length})</h2>
                <div className={styles['comment__input']}>
                    <img
                        className={styles['user-avatar']}
                        src={avatar || '/images/default_user.png'}
                        alt="User avatar"
                    />
                    <textarea
                        name="comment"
                        value={commentInput}
                        readOnly={!isLogin}
                        spellCheck={false}
                        id="comment"
                        placeholder={isLogin ? 'Thêm bình luận...' : 'Đăng nhập để thêm bình luận.'}
                        onChange={(event) => setCommentInput(event.target.value)}
                    ></textarea>
                    <button className={styles['comment__btn']} onClick={handleAddComment}>
                        <SendIcon />
                    </button>
                </div>
                <div className="mt-4 lg:ml-8">
                    {comments.map((comment) => (
                        <CommentItem comment={comment} key={comment?._id} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CommentSection
