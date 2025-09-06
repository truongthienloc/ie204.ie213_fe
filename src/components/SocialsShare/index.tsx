'use client';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';

import styles from '~/styles/product_detail.module.scss';

function SocialsShare() {
  const [isLike, setIsLike] = useState(false);
  const handleLike = () => setIsLike((prev) => !prev);

  return (
    <>
      <div className={styles.socials}>
        <button onClick={handleLike}>
          {isLike ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderOutlinedIcon />}
        </button>
        <button>
          <ShareIcon />
        </button>
      </div>
    </>
  );
}

export default SocialsShare;
