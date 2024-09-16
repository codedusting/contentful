import { type ReactNode } from "react";
import { draftMode } from "next/headers";
import { ContentfulPreviewProvider } from "./_components/contentful-preview-provider";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  const { isEnabled } = draftMode();
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
