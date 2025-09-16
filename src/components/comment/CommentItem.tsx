import { useState } from 'react';

import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { Comment } from '@/api/comment';
import UserIcon from '@/assets/user.svg';
import DeleteDialog from '@/components/modal/DeleteModal';
import { useAuth } from '@/context/AuthContext';
import { timeAgo } from '@/lib/TimeAgo';

import { Textarea } from '../ui/textarea';

type CommentFormValues = { content: string };

interface Props {
  comment: Comment;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, content: string) => void;
}

export default function CommentItem({ comment, onDelete, onEdit }: Props) {
  const { user } = useAuth();

  // 수정 모드 상태
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm<CommentFormValues>({
    defaultValues: { content: `${comment.content}` },
  });

  const handleEditClick = handleSubmit((values) => {
    if (isEditing) {
      // 저장 클릭 → API 호출
      onEdit?.(comment.id, values.content);
      setIsEditing(false);
    } else {
      // 수정 모드 진입
      setIsEditing(true);
    }
  });

  const handleCancel = () => {
    setIsEditing(false);
    reset({ content: comment.content }); // 원래 내용 복원
  };

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
                <p
                  className='cursor-pointer text-xs md:text-md lg:text-lg font-regular text-black-600 underline'
                  onClick={handleEditClick}
                >
                  {isEditing ? '저장' : '수정'}
                </p>
                {isEditing && (
                  <p
                    className='cursor-pointer text-xs md:text-md lg:text-lg font-regular text-gray-500 underline'
                    onClick={handleCancel}
                  >
                    취소
                  </p>
                )}
                {!isEditing && (
                  <DeleteDialog
                    id={comment.id}
                    description='댓글을 정말 삭제하시겠어요?'
                    description2='삭제 후 복구할 수 없어요.'
                    onDelete={() => onDelete?.(comment.id)}
                    triggerText='삭제'
                  />
                )}
              </div>
            )}
          </div>
          {/* 내용 영역 */}
          {isEditing ? (
            <Textarea
              placeholder='100자 이내로 입력해주세요.'
              variant='outlined'
              {...register('content')}
              className='h-[66px md:h-[80px] lg:h-[104px]'
            />
          ) : (
            <p className='mt-2 md:mt-3 lg:mt-4 text-md md:text-lg lg:text-xl font-regular text-black-700'>
              {comment.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
