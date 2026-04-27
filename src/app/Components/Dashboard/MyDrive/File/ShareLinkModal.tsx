/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy, Check, Link2, Clock, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  useCreateShareLinkMutation,
  useRevokeShareLinkMutation,
} from "../../../../redux/features/files/fileApi";
import {
  FileItem,
  ShareLink,
} from "../../../../redux/features/files/file.type";

interface Props {
  open: boolean;
  onClose: () => void;
  file: FileItem;
}

export default function ShareLinkModal({ open, onClose, file }: Props) {
  const [expiresInHours, setExpiresInHours] = useState<string>("");
  const [maxViews, setMaxViews] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<ShareLink | null>(null);

  const [createShareLink, { isLoading: creating }] =
    useCreateShareLinkMutation();
  const [revokeShareLink, { isLoading: revoking }] =
    useRevokeShareLinkMutation();

  const existingLinks = file.shareLinks?.filter((l) => l.isActive) ?? [];
  const activeLink = generatedLink ?? existingLinks[0] ?? null;

  // SSR-safe origin
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = activeLink ? `${origin}/share/${activeLink.token}` : null;

  const handleCreate = async () => {
    try {
      const res = await createShareLink({
        id: file.id,
        expiresInHours: expiresInHours ? Number(expiresInHours) : undefined,
        maxViews: maxViews ? Number(maxViews) : undefined,
      }).unwrap();
      setGeneratedLink(res.data);
      toast.success("Share link created!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create link");
    }
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRevoke = async (token: string) => {
    try {
      await revokeShareLink(token).unwrap();
      setGeneratedLink(null);
      toast.success("Share link revoked");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to revoke link");
    }
  };

  const handleClose = () => {
    setGeneratedLink(null);
    setExpiresInHours("");
    setMaxViews("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-4 w-4" /> Share &quot;{file.name}&quot;
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {shareUrl ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Input
                  readOnly
                  value={shareUrl}
                  className="border-0 bg-transparent text-sm p-0 h-auto focus-visible:ring-0"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopy}
                  className="shrink-0 h-8 w-8"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                {activeLink?.expiresAt && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Expires {new Date(activeLink.expiresAt).toLocaleDateString()}
                  </span>
                )}
                {activeLink?.maxViews && (
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {activeLink.viewCount}/{activeLink.maxViews} views
                  </span>
                )}
                {!activeLink?.expiresAt && !activeLink?.maxViews && (
                  <Badge variant="secondary" className="text-xs">
                    No expiry
                  </Badge>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => activeLink && handleRevoke(activeLink.token)}
                disabled={revoking || !activeLink}
              >
                {revoking ? "Revoking..." : "Revoke Link"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Create a shareable link for this file. You can optionally set an
                expiry or view limit.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Expires in (hours)</Label>
                  <Input
                    type="number"
                    placeholder="Never"
                    value={expiresInHours}
                    onChange={(e) => setExpiresInHours(e.target.value)}
                    min={1}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Max views</Label>
                  <Input
                    type="number"
                    placeholder="Unlimited"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                    min={1}
                  />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleCreate}
                disabled={creating}
              >
                {creating ? "Creating..." : "Generate Link"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}