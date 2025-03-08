import { db } from "@/lib/db";
import EditorProvider from "@/app/providers/editor-provider";
import React from "react";
import EditorNavigation from "../../components/editor/editor-navigation";
import { auth } from "@clerk/nextjs/server";
import PageEditor from "@/app/components/editor/page-editor";
import { RedirectToSignIn, SignIn } from "@clerk/nextjs";
import LeftSidebar from "@/app/components/editor/editor-sidebar/left-sidebar";
import RightSidebar from "@/app/components/editor/editor-sidebar/right-sidebar";

type Props = {
  params: Promise<{
    pageId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const session = await auth();

  const { pageId } = await params;
  const pageDetails = await db.page.findFirst({
    where: {
      id: pageId,
    },
  });

  // TODO: Display access denied page, add ability for users to request access (?)
  if (!pageDetails || !(session.userId === pageDetails.userId)) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <EditorProvider pageId={pageId} pageDetails={pageDetails}>
        <EditorNavigation pageDetails={pageDetails} />
        <div className="relative flex w-full h-full">
          <div className="flex-shrink-0">
            <LeftSidebar />
          </div>
          <div className="flex-1 p-0 m-0">
            <PageEditor pageId={pageId} />
          </div>
          <div className="flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </EditorProvider>
    </div>
  );
};

export default Page;
