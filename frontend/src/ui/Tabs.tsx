import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

// Root (no change needed)
export const Tabs = TabsPrimitive.Root;

// TabsList
type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

export const TabsList = ({ className, ...props }: TabsListProps) => (
  <TabsPrimitive.List className={cn("flex gap-2", className)} {...props} />
);

// TabsTrigger
type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
>;

export const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      "px-4 py-2 rounded-lg text-sm data-[state=active]:bg-black data-[state=active]:text-white",
      className,
    )}
    {...props}
  />
);

// TabsContent
type TabsContentProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>;

export const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Content className={cn("mt-4", className)} {...props} />
);
