'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { UserRole } from '~/interfaces/user';
import { useAuth } from '~/stores/auth';

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
