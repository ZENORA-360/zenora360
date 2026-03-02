import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium variants
        gold: "bg-gradient-gold-shine text-primary-foreground hover:opacity-90 shadow-gold hover:shadow-lg",
        goldOutline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-[0_0_30px_-5px_hsla(42,70%,50%,0.5)] hover:shadow-[0_0_60px_-10px_hsla(42,70%,50%,0.7)] hover:-translate-y-1",
        heroOutline:
          "bg-card/50 hover:bg-card/80 border border-border hover:border-primary/50 text-foreground rounded-full backdrop-blur-md hover:-translate-y-1",
        dark: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-elegant",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

