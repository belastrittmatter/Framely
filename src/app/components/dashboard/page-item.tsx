"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePage } from "@/app/actions/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Globe, Clock, ExternalLink } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import { Page } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

function PageItem({ page }: { page: Page }) {
  const router = useRouter();

  const handleDelete = async (pageId: string) => {
    const result = await deletePage(pageId);
    if (result.success) {
      toast.success("Success", { description: "Page deleted successfully" });
    } else {
      toast.error("Error", { description: "Failed to delete page" });
    }

    router.refresh();
  };

  return (
    <Card>
      <CardHeader className="group flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="flex-1 space-y-3">
          <Link
            href={`/editor/${page.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 space-y-3"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {page.title}
              </h2>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
            </div>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-accent/50"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive flex items-center gap-2"
              onClick={() => handleDelete(page.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="group flex items-center gap-2 hover:cursor-pointer">
            <Globe className="group-hover:text-primary w-4 h-4 flex-shrink-0 mt-1" />
            <Link
              href={`https://${page.subdomain}.framely.site`}
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:text-primary"
            >
              {page.subdomain}.framely.site
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 flex-shrink-0 mt-1" />
            <span>Updated {formatTimeAgo(Number(page.updatedAt))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PageItem;
