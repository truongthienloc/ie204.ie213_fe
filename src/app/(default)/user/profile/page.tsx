'use client';

import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useEffect, useState } from 'react';

import { User } from '~/interfaces/user';
import { getCurrentUser } from '~/services/axios/actions/user.action';
import styles from '~/styles/user.module.scss';

function UserProfilePage() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const user: User = await getCurrentUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className={styles.heading}>
        <h1>Thông tin khách hàng</h1>
        <button>
          <EditNoteOutlinedIcon />
        </button>
      </div>
      <div className={styles.content}>
        <div>
          <div>
            <span>Tên khách hàng</span>
            <span className={styles['user_info']}>{user?.username}</span>
          </div>
          <div className="mt-4">
            <span>Email</span>
            <span className={styles['user_info']}>{user?.email}</span>
          </div>
        </div>
        <div>
          <div>
            <span>Số lần ăn tại quán</span>
            <span className={styles['user_info']}>{5}</span>
          </div>
          <div className="mt-4">
            <span>Điểm thành viên</span>
            <span className={styles['user_info']}>{100}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
