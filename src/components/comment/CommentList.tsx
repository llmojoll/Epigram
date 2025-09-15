'use client';

import { useRef, useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getComments, CommentsResponse, Comment } from '@/api/comment';
import CommentItem from '@/components/comment/CommentItem';

interface CommentListProps {
  epigramId: number;
  onDelete?: (commentId: number) => void;
}

export default function CommentList({ epigramId, onDelete }: CommentListProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 무한 댓글 조회
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<CommentsResponse>({
      queryKey: ['comments', epigramId],
      queryFn: ({ pageParam }) =>
        getComments({ epigramId, cursor: pageParam as number | undefined, limit: 5 }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: undefined,
    });

  const allComments: Comment[] = data?.pages.flatMap((page) => page.list) ?? [];

  // 무한 스크롤 IntersectionObserver
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1.0 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='flex flex-col mt-3 md:mt-8 lg:mt-10'>
      {allComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onDelete={onDelete} />
      ))}
      <div ref={loadMoreRef} className='h-10 flex justify-center items-center'>
        {isFetchingNextPage && <span>불러오는 중...</span>}
      </div>
    </div>
  );
}
