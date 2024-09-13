import { type ReactNode } from "react";
import { draftMode } from "next/headers";
import { ContentfulPreviewProvider } from "@/app/preview/_components/contentful-preview-provider";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  const { isEnabled } = draftMode();
  // console.log({ isEnabled });
  return (
    <ContentfulPreviewProvider
      locale="en-US"
      enableInspectorMode={isEnabled}
      enableLiveUpdates={isEnabled}
    >
      {children}
    </ContentfulPreviewProvider>
  );
}
