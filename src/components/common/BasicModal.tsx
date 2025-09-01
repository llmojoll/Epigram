'use client';

import React, { useState } from 'react';

import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function BasicModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>열기</DialogTrigger>
      <DialogContent>
        <p>내용</p>
        <DialogClose>닫기</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
