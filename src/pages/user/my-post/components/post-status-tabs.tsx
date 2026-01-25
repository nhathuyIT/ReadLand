import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PostStatus } from "@/types/post.type";

interface PostStatusTabsProps {
    activeTab: PostStatus | "ALL";
    onTabChange: (tab: PostStatus | "ALL") => void;
    counts: Record<PostStatus | "ALL", number>;
}

export function PostStatusTabs({
    activeTab,
    onTabChange,
    counts,
}: PostStatusTabsProps) {
    const tabs = [
        { value: "ALL" as const, label: "All Posts" },
        { value: "DRAFT" as const, label: "Drafts" },
        { value: "PENDING" as const, label: "Pending" },
        { value: "APPROVED" as const, label: "Approved" },
        { value: "REJECTED" as const, label: "Rejected" },
    ];

    return (
        <>
            {/* Desktop Tabs - Hidden on mobile */}
            <div className="hidden md:block">
                <Tabs value={activeTab} onValueChange={onTabChange as (value: string) => void}>
                    <TabsList className="grid grid-cols-5">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="relative gap-2"
                            >
                                {tab.label}
                                {counts[tab.value] > 0 && (
                                    <Badge
                                        variant="secondary"
                                        className="ml-1 h-5 min-w-5 px-1 text-xs"
                                    >
                                        {counts[tab.value]}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* Mobile Dropdown - Shown only on mobile */}
            <div className="md:hidden w-full">
                <Select value={activeTab} onValueChange={onTabChange as (value: string) => void}>
                    <SelectTrigger className="w-full">
                        <SelectValue>
                            {tabs.find(t => t.value === activeTab)?.label}
                            {counts[activeTab] > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="ml-2 h-5 min-w-5 px-1 text-xs"
                                >
                                    {counts[activeTab]}
                                </Badge>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {tabs.map((tab) => (
                            <SelectItem key={tab.value} value={tab.value}>
                                <div className="flex items-center gap-2">
                                    {tab.label}
                                    {counts[tab.value] > 0 && (
                                        <Badge
                                            variant="secondary"
                                            className="h-5 min-w-5 px-1 text-xs"
                                        >
                                            {counts[tab.value]}
                                        </Badge>
                                    )}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    );
}
