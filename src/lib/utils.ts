import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utils/download.ts

export async function downloadFile(fileUrl: string, fileName?: string) {
  const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileUrl);

  if (isImage) {
    // Download image directly
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName || fileUrl.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } else {
    window.open(fileUrl, "_blank");
  }
}

export async function fetchAndDownloadFile(
  apiUrl: string,
  itemId: string,
  closeDropdown?: () => void,
) {
  try {
    const response = await fetch(`${apiUrl}/files/${itemId}/download`);
    const data = await response.json();
    const fileUrl = data.url;

    await downloadFile(fileUrl);
    closeDropdown?.();
  } catch (error) {
    console.error("Download failed:", error);
  }
}
