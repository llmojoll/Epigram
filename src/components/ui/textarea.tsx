import * as React from 'react';

import { cn } from '@/lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  variant?: 'default' | 'outlined'; // variant 종류
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClass = {
      default: 'border border-blue-300 placeholder:text-blue-400 text-black-950 resize-none',
      outlined:
        'border border-blue-200 placeholder:text-blue-400 text-black-700 focus:border-black-600 bg-transparent resize-none',
    }[variant];

    return (
      <textarea
        ref={ref}
        data-slot='textarea'
        className={cn(
          'flex field-sizing-content min-h-16 w-full rounded-lg px-4 py-2.5 text-lg lg:text-xl shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 text-regular',
          variantClass,
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
