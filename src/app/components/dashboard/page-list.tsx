import { SidebarTrigger } from "@/components/ui/sidebar";
import NewPageModal from "./new-page-modal";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import PageItem from "./page-item";
async function PageList() {
  const { userId } = await auth();
  const pages = await db.page.findMany({ where: { userId: userId || "" } });

  return (
    <div className="w-full p-6">
      <SidebarTrigger className="w-12 h-12 mb-4" />
      <div className="container mx-auto flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Pages</h1>
            <NewPageModal />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {pages.map((page) => (
              <PageItem key={page.id} page={page} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageList;