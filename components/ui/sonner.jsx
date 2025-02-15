"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:shadow-lg",
          description:
            "group-[.toast]:text-discriptionForeground text-[12px] font-mono ml-2",
          actionButton:
            "group-[.toast]:bg-main group-[.toast]:text-foreground",
          cancelButton: "group-[.toast]:bg-main group-[.toast]:text-foreground"
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
