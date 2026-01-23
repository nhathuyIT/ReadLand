import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
        <Tabs value={activeTab} onValueChange={onTabChange as (value: string) => void}>
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
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
    );
}
