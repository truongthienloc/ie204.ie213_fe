'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '~/stores/auth';
import { UserRole } from '~/interfaces/user';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user?.role === UserRole.ADMIN) {
      router.replace('/admin/manage-sales');
    }
  }, [router, user?.role]);
  return null;
}
