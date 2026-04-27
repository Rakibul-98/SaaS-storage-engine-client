/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FileTypeSelect from "./FileTypeSelect";

const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  maxFolders: z.number().min(1, "Must be at least 1"),
  maxLevels: z.number().min(1, "Must be at least 1"),
  allowedFileType: z.array(z.string()).min(1, "Select at least one file type"),
  maxFileSizeMB: z.number().min(1, "Must be at least 1"),
  storageQuotaMB: z.number().min(1, "Must be at least 1"),
  fileLimit: z.number().min(1, "Must be at least 1"),
  filesPerFolder: z.number().min(1, "Must be at least 1"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SubscriptionFormData) => void;
  initialData?: SubscriptionFormData | null;
  mode: "create" | "edit";
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}) => {
  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      maxFolders: 1,
      maxLevels: 1,
      allowedFileType: [],
      maxFileSizeMB: 1,
      storageQuotaMB: 100,
      fileLimit: 1,
      filesPerFolder: 1,
    },
  });

  useEffect(() => {
    if (initialData && mode === "edit") {
      form.reset(initialData);
    } else {
      form.reset({
        name: "",
        maxFolders: 1,
        maxLevels: 1,
        allowedFileType: [],
        maxFileSizeMB: 1,
        fileLimit: 1,
        filesPerFolder: 1,
      });
    }
  }, [initialData, mode, form, open]);

  const handleSubmit = (data: SubscriptionFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-125"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Create Subscription Package"
              : "Edit Subscription Package"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter package name"
                      {...field}
                      readOnly={mode === "edit"}
                      className={
                        mode === "edit"
                          ? "bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-default"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maxFolders"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Max Folders</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxLevels"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Max Levels</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="allowedFileType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allowed File Types</FormLabel>
                  <FormControl>
                    <FileTypeSelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="maxFileSizeMB"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Max File Size (MB)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fileLimit"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>File Limit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="filesPerFolder"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Files Per Folder</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {mode === "create" ? "Create" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
