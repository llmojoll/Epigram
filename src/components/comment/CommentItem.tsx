import Image from 'next/image';

import { Comment } from '@/api/comment';
import UserIcon from '@/assets/user.svg';
import DeleteDialog from '@/components/modal/DeleteModal';
import { useAuth } from '@/context/AuthContext';
import { timeAgo } from '@/lib/TimeAgo';

interface Props {
  comment: Comment;
  onDelete?: (id: number) => void;
}

export default function CommentItem({ comment, onDelete }: Props) {
  const { user } = useAuth();

  return (
    <div>
      <hr className='w-full' />
      <div className='flex rounded mx-6 my-4 md:my-6 lg:my-9'>
        {comment.writer.image ? (
          <Image
            src={comment.writer.image}
            alt={`${comment.writer.nickname}의 프로필 이미지`}
            width={24}
            height={24}
            className='rounded-full'
          />
        ) : (
          <UserIcon className='w-6 h-6 rounded-full text-gray-300' />
        )}
        <div className='flex flex-col ml-4 w-full'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <p className='text-xs md:text-md lg:text-lg font-regular text-black-300'>
                {comment.writer.nickname}
              </p>
              <p className='text-xs md:text-md lg:text-lg font-regular text-black-300 ml-2'>
                {timeAgo(comment.updatedAt)}
              </p>
            </div>
            {user && comment.writer.id === user.id && (
              <div className='flex gap-2'>
                <p className='cursor-pointer text-xs md:text-md lg:text-lg font-regular text-black-600 underline'>
                  수정
                </p>
                <DeleteDialog
                  id={comment.id}
                  description='댓글을 정말 삭제하시겠어요?'
                  description2='삭제 후 복구할 수 없어요.'
                  onDelete={() => onDelete?.(comment.id)}
                />
              </div>
            )}
          </div>
          <p className='mt-2 md:mt-3 lg:mt-4 text-md md:text-lg lg:text-xl font-regular text-black-700'>
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}
