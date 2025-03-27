import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground placeholder:text-secondary placeholder:opacity-70 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 rounded-lg border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-none",
  {
    variants: {
      variant: {
        default: "bg-white focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        picture: "bg-background focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        error: "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      },
      size: {
        default: "h-9 px-3 py-1 text-base md:text-sm",
        xl: "w-[85%] h-50 px-4 py-2 text-sm",
        lg: "w-[85%] h-11 px-4 py-2 text-lg",
        sm: "w-[85%] h-11 px-4 py-2 text-sm",
        xs: "w-[60%] h-30 px-5 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface InputProps
extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "file";
  className?: string;
}

function Input({ className, type = "text", variant, size, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Input };