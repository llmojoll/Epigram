'use client';

import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';

import { CommentsResponse, deleteComment, getComments, postComment } from '@/api/comment';
import { Epigram } from '@/api/epigram';
import Likeicon from '@/assets/likeicon.svg';
import Linkbtn from '@/assets/linkbtn.svg';
import UserIcon from '@/assets/user.svg';
import DeleteDialog from '@/components/modal/DeleteModal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { timeAgo } from '@/lib/TimeAgo';

type CommentFormValues = {
  content: string;
};
interface Props {
  initialData: Epigram;
}

export default function EpigramDetailClient({ initialData }: Props) {
  const [epigram] = useState(initialData);
  const [likes, setLikes] = useState(0);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<CommentFormValues>({
    defaultValues: { content: '' },
  });

  const handleLike = () => setLikes((prev) => prev + 1);

  //댓글 조회
  const { data: commentsResponse } = useQuery<CommentsResponse>({
    queryKey: ['comments', epigram.id],
    queryFn: () => getComments({ epigramId: Number(epigram.id), limit: 5 }),
    refetchOnWindowFocus: false,
  });

  const onSubmit: SubmitHandler<CommentFormValues> = (data) => {
    if (!data.content.trim()) return;
    commentMutation.mutate(data.content);
    console.log(epigram.id);
    reset();
  };
  // 댓글 작성 mutation
  const commentMutation = useMutation({
    mutationFn: (content: string) =>
      postComment({
        epigramId: epigram.id,
        isPrivate: false,
        content,
      }),
    onSuccess: () => {
      // 작성 후 댓글 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ['comments', Number(epigram.id)],
      });
    },
  });
  //댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', Number(epigram.id)],
      });
    },
  });
  const handeleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  return (
    <main className=''>
      {/* 피드 */}
      <div className='w-full bg-[repeating-linear-gradient(white,white_25px,#ABB8CE_26px)] h-[calc(100%-0px)]'>
        <div className='mx-auto pt-10 max-w-[312px] md:max-w-[384px] lg:max-w-[640px]'>
          {epigram.tags?.map((tag) => (
            <span key={tag.id} className='text-blue-400 text-md md:text-lg lg:text-xl mr-2'>
              #{tag.name}
            </span>
          ))}
          <p className='font-iropke text-black-700 text-2xl lg:text-3xl font-regular mt-4 md:mt-6 lg:mt-8'>
            {epigram.content}
          </p>
          <p className='text-blue-400 font-regular font-iropke text-right text-lg md:text-xl lg:text-2xl mt-4 md:mt-6 lg:mt-8'>
            - {epigram.author} -
          </p>
          <div className='flex gap-2 lg:gap-4 justify-center mt-8 lg:mt-9 pb-4 md:pb-8 lg:pb-10'>
            <Button
              variant='black600'
              size='sm'
              onClick={handleLike}
              className='flex items-center rounded-full gap-0'
            >
              <Likeicon className='!w-[20px] lg:!w-[32px] !h-[20px] lg:!h-[32px] m-1 lg:m-2' />
              <p>{likes}</p>
            </Button>
            <Button
              variant='line100'
              className='w-[130px] lg:w-[181px] h-9 lg:h-12 text-md lg:text-xl font-medium rounded-full'
            >
              왕도로 가는길
              <Linkbtn className='!w-[20px] lg:!w-[32px] !h-[20px] lg:!h-[32px]' />
            </Button>
          </div>
        </div>
      </div>

      {/* 댓글 */}
      <div className='mx-auto pt-10 max-w-[312px] md:max-w-[384px] lg:max-w-[640px]'>
        <p>댓글 ({commentsResponse?.totalCount ?? 0})</p>
        <div className='flex items-center mt-4 lg:mt-6'>
          <div>유저이미지</div>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <Textarea
              placeholder='100자 이내로 입력해주세요.'
              variant='outlined'
              {...register('content')}
              className='h-[66px md:h-[80px] lg:h-[104px]'
            />
            <div className='flex justify-end'>
              <Button type='submit' className='lg:w-[60px] lg:h-[44px] mt-2 lg:mt-4' size='xs'>
                저장
              </Button>
            </div>
          </form>
        </div>
        <div className='flex flex-col mt-3 md:mt-8 lg:mt-10'>
          {commentsResponse?.list.map((comment) => (
            <div key={comment.id}>
              <hr className='w-full' />
              {/* 컨테이너 */}
              <div key={comment.id} className='flex rounded mx-6 my-4 md:my-6 lg:my-9'>
                {comment.writer.image ? (
                  <Image
                    key={comment.id}
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
                    <div className='flex gap-2'>
                      <p className='cursor-pointer text-xs md:text-md lg:text-lg font-regular text-black-600 underline'>
                        수정
                      </p>
                      {/* 댓글 삭제 모달 */}
                      <DeleteDialog
                        id={comment.id}
                        description='댓글을 정말 삭제하시겠어요?'
                        description2='삭제 후 복구할 수 없어요.'
                        onDelete={() => handeleDeleteComment(comment.id)}
                      />
                    </div>
                  </div>
                  <p className='mt-2 md:mt-3 lg:mt-4 text-md md:text-lg lg:text-xl font-regular text-black-700'>
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
