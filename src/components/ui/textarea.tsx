import * as React from 'react';

import { cn } from '@/lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  variant?: 'default' | 'outlined'; // variant 종류
};

function Textarea({ className, variant = 'default', ...props }: TextareaProps) {
  const variantClass = {
    default: 'border border-blue-300 placeholder:text-blue-400 text-black-950',
    outlined:
      'border border-blue-200 placeholder:text-blue-400 text-black-700 focus:border-black-600 bg-transparent',
  }[variant];

  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-lg px-4 py-2.5 text-lg lg:text-xl shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 text-regular',
        variantClass,
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
