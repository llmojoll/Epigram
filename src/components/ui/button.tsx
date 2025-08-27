import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { pretendard, iropke } from '@/app/fonts';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        line100: 'bg-line-100 text-gray-300',
        line200: 'bg-line-200 text-blue-500',
        black500: 'bg-black-500 text-white hover:bg-black-400',
        black600: 'bg-black-600 text-white hover:bg-black-500',
        blue900: 'bg-blue-900 text-white hover:bg-blue-700',
      },
      size: {
        sm: 'w-[76px] lg:w-[102px] h-[36px] lg:h-[48px] text-md lg:text-xl font-semibold',
        md: 'w-[145px] lg:w-[194px] h-[48px] lg:h-[64px] rounded-full text-md lg:text-xl font-semibold',
        lg: 'w-[312px] md:w-[384px] lg:w-[640px] h-[44px] lg:h-[64px] rounded-xl lg:rounded-2xl text-lg lg:text-xl font-semibold',
        full: 'w-full h-11',
        icon: 'size-9',
      },
      font: {
        pretendard: pretendard.className,
        iropke: iropke.className,
      },
    },
    defaultVariants: {
      variant: 'black500',
      size: 'full',
      font: 'pretendard',
    },
  },
);

function Button({
  className,
  variant,
  size,
  font,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, font, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
