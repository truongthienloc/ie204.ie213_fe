'use client';

import { ProductComment } from '~/interfaces/product';
import dayjs from 'dayjs';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

import styles from '~/styles/product_detail.module.scss';
import { memo, useEffect, useState } from 'react';
import { useAuth } from '~/stores/auth';
import { useRouter } from 'next/navigation';
import { User } from '~/interfaces/user';
import { getUserById } from '~/services/axios/actions/user.action';
import { EMTPY_STRING } from '~/constants';

type Props = {
  comment: ProductComment;
};

const CommentItem = memo(({ comment }: Props) => {
  const [isLike, setIsLike] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowReply, setIsShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState(EMTPY_STRING);
  const [user, setUser] = useState<User>();

  const { isAuthenticated, user: authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (comment.userId) {
          const user: User = await getUserById(comment?.userId);
          setUser(user);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [comment.userId]);

  const handleClearReply = () => {
    setReplyInput(EMTPY_STRING);
    setIsShowReply(false);
  };

  const handleShowReply = () => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setIsShowReply(true);
    }
  };

  const handleLikeComment = () => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setIsLike((prev) => !prev);
    }
  };

  return (
    <>
      <div className={styles.comment}>
        <img src={user?.avatar.link || '/images/default_user.png'} alt="user avatar" />
        <div className={styles['comment__content']}>
          <div>
            <span className={styles.username}>{user?.username}</span>
            <span className={styles.date}>{dayjs(comment?.createdAt).format('DD/MM/YYYY')}</span>
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
                {isLike ? <ThumbUpIcon className="text-md" /> : <ThumbUpAltOutlinedIcon className={styles.icon} />}
              </button>
              <button className={styles.reply} onClick={handleShowReply}>
                Reply
              </button>
            </div>
            {isShowReply && (
              <div>
                <div className="mt-2 flex items-center gap-4">
                  <img src={authUser?.avatar?.link ?? '/images/default_user.png'} alt="user avatar" />
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
  );
});
CommentItem.displayName = 'CommentItem';

export default CommentItem;
