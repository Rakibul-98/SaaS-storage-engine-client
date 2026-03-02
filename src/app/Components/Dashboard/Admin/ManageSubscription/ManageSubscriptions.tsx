/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateSubscriptionPackageMutation,
  useDeleteSubscriptionPackageMutation,
  useGetAllPackagesQuery,
  useGetSinglePackageQuery,
  useUpdateSubscriptionPackageMutation,
} from "../../../../redux/features/subscription/subscriptionApi";
import SubscriptionTable from "./SubscriptionTable";
import SubscriptionModal from "./SubscriptionModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import TrashSkeleton from "../../Trash/TrashSkeleton";

export default function ManageSubscriptions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );
  const [selectedPackageName, setSelectedPackageName] = useState<string>("");
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const { data: packagesData, isLoading } = useGetAllPackagesQuery();
  const { data: singlePackageData } = useGetSinglePackageQuery(
    selectedPackageId || "",
    {
      skip: !selectedPackageId,
    },
  );

  const [createPackage] = useCreateSubscriptionPackageMutation();
  const [updatePackage] = useUpdateSubscriptionPackageMutation();
  const [deletePackage] = useDeleteSubscriptionPackageMutation();

  const handleCreate = () => {
    setModalMode("create");
    setSelectedPackageId(null);
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setModalMode("edit");
    setSelectedPackageId(id);
    setModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    setSelectedPackageId(id);
    setSelectedPackageName(name);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (modalMode === "create") {
        await createPackage(data).unwrap();
        toast.success("Package created successfully");
      } else {
        if (!selectedPackageId) return;
        await updatePackage({ id: selectedPackageId, ...data }).unwrap();
        toast.success("Package updated successfully");
      }
      setModalOpen(false);
    } catch (error) {
      toast.error(
        modalMode === "create"
          ? "Failed to create package"
          : "Failed to update package",
      );
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedPackageId) return;
      await deletePackage(selectedPackageId).unwrap();
      toast.success("Package deleted successfully");
      setDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  const getInitialData = () => {
    if (modalMode === "edit" && singlePackageData?.data) {
      return {
        name: singlePackageData.data.name,
        maxFolders: singlePackageData.data.maxFolders,
        maxLevels: singlePackageData.data.maxLevels,
        allowedFileType: singlePackageData.data.allowedFileType,
        maxFileSizeMB: singlePackageData.data.maxFileSizeMB,
        fileLimit: singlePackageData.data.fileLimit,
        filesPerFolder: singlePackageData.data.filesPerFolder,
      };
    }
    return null;
  };

  if (isLoading) {
    return <TrashSkeleton />;
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Subscription Packages</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Manage your subscription packages and their features
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          New Package
        </Button>
      </div>

      <SubscriptionTable
        data={packagesData?.data || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SubscriptionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleSubmit}
        initialData={getInitialData()}
        mode={modalMode}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        packageName={selectedPackageName}
      />
    </div>
  );
}
