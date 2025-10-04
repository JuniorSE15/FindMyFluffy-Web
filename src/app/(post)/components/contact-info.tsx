import { Skeleton } from '@/components/ui/skeleton';
import { getUserByIdAction } from '@/services/user.service';
import { User } from '@/types/user';
import { Mail, Phone, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ContactInfoProps {
  userId: string;
}

export const ContactInfo = ({ userId }: ContactInfoProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleGetUser = async () => {
    setLoading(true);
    try {
      const user = await getUserByIdAction(userId);
      setUser(user);
    } catch (error) {
      console.error('Error getting user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, [userId]);

  if (loading) {
    return <Skeleton className='h-4 w-full' />;
  }

  if (!user) {
    return <div className='text-sm text-gray-600'>User not found</div>;
  }

  return (
    <div className='space-y-3 text-sm text-gray-600'>
      <div className='flex items-center space-x-2'>
        <UserCircle className='h-5 w-5 text-gray-400' />
        <span>{user?.userName}</span>
      </div>
      <div className='flex items-center space-x-2'>
        <Phone className='h-5 w-5 text-gray-400' />
        <span>{user?.phoneNumber}</span>
      </div>
      <div className='flex items-center space-x-2'>
        <Mail className='h-5 w-5 text-gray-400' />
        <span>{user?.email}</span>
      </div>
    </div>
  );
};
