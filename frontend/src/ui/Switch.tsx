import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "w-10 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-black",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className='block w-5 h-5 bg-white rounded-full translate-x-0.5 data-[state=checked]:translate-x-5 transition' />
    </SwitchPrimitive.Root>
  );
}
