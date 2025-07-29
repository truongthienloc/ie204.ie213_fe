'use client';

import SendIcon from '@mui/icons-material/Send';
import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

import { ProductComment } from '~/interfaces/product';
import { addComment, getProductComments } from '~/services/axios/actions/product.action';
import { useAuth } from '~/stores/auth';
import { DEFAULT_USER_AVATAR_PATH } from '~/constants';
import { BASE_COMMENT_LEVEL } from './constants';

import CommentItem from './CommentItem';
import styles from '~/styles/product_detail.module.scss';

type Props = {
  productId: string;
};

const CommentSection = memo(({ productId }: Props) => {
  const [commentInput, setCommentInput] = useState<string>('');
  const [comments, setComments] = useState<ProductComment[]>([]);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getProductComments(productId).then((comments) => {
      setComments(comments || []);
    });
  }, [productId]);

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      router.push('/login');

      return;
    } else {
      if (!commentInput.trim()) return;

      const newComment: ProductComment = {
        content: commentInput,
        dishId: productId,
        rating: 5,
        userId: user?._id || '',
        replies: [],
        level: BASE_COMMENT_LEVEL,
      };

      setComments([newComment, ...comments]);
      setCommentInput('');

      try {
        await addComment(commentInput, productId);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className={styles['comment__container']}>
        <h2 className={styles['sub-title']}>Đánh giá sản phẩm ({comments?.length})</h2>
        <div className={styles['comment__input']}>
          <img
            className={styles['user-avatar']}
            src={user?.avatar.link ?? DEFAULT_USER_AVATAR_PATH}
            alt="User avatar"
          />
          <textarea
            name="comment"
            value={commentInput}
            readOnly={!isAuthenticated}
            spellCheck={false}
            id="comment"
            placeholder={isAuthenticated ? 'Thêm bình luận...' : 'Đăng nhập để thêm bình luận.'}
            onChange={(event) => setCommentInput(event.target.value)}
          ></textarea>
          <button className={styles['comment__btn']} onClick={handleAddComment}>
            <SendIcon />
          </button>
        </div>
        <div className="mt-4 lg:ml-8">
          {isEmpty(comments) ? (
            <span className={styles['no_comment_message']}>Sản phẩm chưa có bình luận.</span>
          ) : (
            comments.map((comment) => <CommentItem comment={comment} key={comment?._id} />)
          )}
        </div>
      </div>
    </>
  );
});

CommentSection.displayName = 'CommentSection';

export default CommentSection;
