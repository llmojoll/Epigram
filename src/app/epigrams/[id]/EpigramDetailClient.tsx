'use client';

import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteComment, postComment, editComment } from '@/api/comment';
import { Epigram, getEpigramById, likeEpigram, unlikeEpigram } from '@/api/epigram';
import Likeicon from '@/assets/likeicon.svg';
import Linkbtn from '@/assets/linkbtn.svg';
import CommentForm from '@/components/comment/CommentForm';
import CommentList from '@/components/comment/CommentList';
import EpigramDropdown from '@/components/dropdown/EpigramDropdown';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface Props {
  epigramId: number;
}

export default function EpigramDetailClient({ epigramId }: Props) {
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  // epigram 상세조회
  const { data: epigram, refetch: refetchEpigram } = useQuery<Epigram>({
    queryKey: ['epigram', epigramId],
    queryFn: () => getEpigramById(epigramId),
  });

  // 댓글 작성 mutation
  const commentMutation = useMutation({
    mutationFn: (content: string) => postComment({ epigramId, isPrivate: false, content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', epigramId] }),
  });

  //댓글 수정 mutation
  const handleEditComment = (commentId: number, content: string) => {
    EditCommentMutaiton.mutate({ commentId, content });
  };
  const EditCommentMutaiton = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      editComment(commentId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', Number(epigramId)] }),
  });

  // 댓글 삭제 mutation
  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['comments', Number(epigramId)],
      }),
  });

  // 좋아요 mutation
  const likeMutation = useMutation({
    mutationFn: () => (epigram?.isLiked ? unlikeEpigram(epigram.id) : likeEpigram(epigram!.id)),
    onSuccess: () => refetchEpigram(),
  });

  // url 복사
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('URL 복사 실패', err);
    }
  };

  if (!epigram) return <p>로딩 중...</p>;

  return (
    <main>
      {/* 피드 */}
      <div className='w-full bg-[repeating-linear-gradient(white,white_25px,#ABB8CE_26px)] lg:bg-[repeating-linear-gradient(white,white_35px,#ABB8CE_36px)] h-[calc(100%-0px)]'>
        <div className='mx-auto pt-10 max-w-[312px] md:max-w-[384px] lg:max-w-[640px]'>
          <div className='flex justify-between items-center'>
            <div>
              {epigram.tags?.map((tag) => (
                <span key={tag.id} className='text-blue-400 text-md md:text-lg lg:text-xl mr-2'>
                  #{tag.name}
                </span>
              ))}
            </div>

            {user?.id === epigram.writerId && <EpigramDropdown epigramId={epigram.id} />}
          </div>
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
              onClick={() => likeMutation.mutate()}
              disabled={likeMutation.isPending}
              className='flex items-center rounded-full gap-0'
            >
              <Likeicon className='!w-[20px] lg:!w-[32px] !h-[20px] lg:!h-[32px] m-1 lg:m-2' />
              <p>{epigram.likeCount}</p>
            </Button>
            <Button
              variant='line100'
              className='w-[130px] lg:w-[181px] h-9 lg:h-12 text-md lg:text-xl font-medium rounded-full'
              onClick={handleCopyLink}
            >
              {copied ? '복사됨!' : '왕도로 가는길'}
              <Linkbtn className='!w-[20px] lg:!w-[32px] !h-[20px] lg:!h-[32px]' />
            </Button>
          </div>
        </div>
      </div>

      {/* 댓글 */}
      <div className='mx-auto pt-10 max-w-[312px] md:max-w-[384px] lg:max-w-[640px]'>
        <p>댓글</p>
        <div className='flex items-center mt-4 lg:mt-6'>
          <div>유저이미지</div>
          <CommentForm onSubmit={(content) => commentMutation.mutate(content)} />
        </div>
        <CommentList
          epigramId={epigramId}
          onDelete={handleDeleteComment}
          onEdit={handleEditComment}
        />
      </div>
    </main>
  );
}
