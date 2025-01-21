"use client";

import { Slot } from "@radix-ui/react-slot";

const ClipboardButton = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  return <Slot onClick={copyToClipboard}>{children}</Slot>;
};

export default ClipboardButton;
