import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { GetAllPackagesResponse } from "../../../../redux/features/subscription/subscription.types";

interface SubscriptionTableProps {
  data: GetAllPackagesResponse["data"];
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const formatFileTypes = (types: string[]) => {
    return types.map((type) => (
      <Badge key={type} variant="outline" className="mr-1">
        {type}
      </Badge>
    ));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Max Folders</TableHead>
            <TableHead>Max Levels</TableHead>
            <TableHead>Allowed File Types</TableHead>
            <TableHead>Max File Size (MB)</TableHead>
            <TableHead>File Limit</TableHead>
            <TableHead>Files Per Folder</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.maxFolders}</TableCell>
              <TableCell>{item.maxLevels}</TableCell>
              <TableCell>{formatFileTypes(item.allowedFileType)}</TableCell>
              <TableCell>{item.maxFileSizeMB}</TableCell>
              <TableCell>{item.fileLimit}</TableCell>
              <TableCell>{item.filesPerFolder}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(item.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(item.id, item.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-muted-foreground"
              >
                No subscription packages found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubscriptionTable;
