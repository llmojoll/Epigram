'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';

type DeleteDialogProps = {
  id: number;
  description: string;
  description2: string;
  onDelete: (id: number) => void;
  triggerText?: string;
  triggerElement?: string;
};

export default function DeleteDialog({
  id,
  description,
  description2,
  onDelete,
  triggerText = '삭제하기5',
  triggerElement,
}: DeleteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerElement ? (
          <p className='cursor-pointer flex justify-center font-regular text-black-600 text-md lg:text-xl'>
            {triggerElement}
          </p>
        ) : (
          <p className='cursor-pointer text-xs md:text-md lg:text-lg font-regular text-red-500 underline'>
            {triggerText}
          </p>
        )}
      </DialogTrigger>
      <DialogContent
        className='bg-white flex flex-col items-center justify-center w-[320px] md:w-[372px] lg:w-[452px] h-[238px] md:h-[282px] lg:h-[332px] px-4 md:px-[38px] py-6 md:py-8 lg:py-10 '
        showCloseButton={false}
      >
        <DialogTitle>
          <p className='hidden'>삭제하기</p>
        </DialogTitle>
        <DialogHeader className='flex flex-col items-center'>
          <Image src='/warring.png' alt='경고 이미지' width={48} height={48} className='' />
          <DialogDescription className='whitespace-pre-line text-lg md:text-xl lg:text-2xl font-semibold text-black-700 mt-4 md:mt-6'>
            {description}
          </DialogDescription>
          <DialogDescription className='whitespace-pre-line text-md md:text-lg lg:text-2lg font-regular text-gray-400'>
            {description2}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex w-full gap-2 lg:gap-4'>
          <DialogClose asChild>
            <Button className='bg-blue-200 hover:bg-blue-300 text-black-700 lg:h-[58px] flex-1'>
              취소
            </Button>
          </DialogClose>
          <Button
            className='h-[48px] lg:h-[58px] flex-1'
            variant='blue900'
            onClick={() => onDelete(id)}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
