/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import RenameFileDialog from "./RenameFileDialog";
import MoveFileDialog from "./MoveFileDialog";
import DeleteFileDialog from "./DeleteFileDialog";

interface FileActionsProps {
  file: any;
  onClose: () => void;
}

export default function FileActions({ file, onClose }: FileActionsProps) {
  return (
    <>
      <DropdownMenuItem asChild>
        <RenameFileDialog file={file} onClose={onClose} />
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <MoveFileDialog file={file} onClose={onClose} />
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <DeleteFileDialog file={file} />
      </DropdownMenuItem>
    </>
  );
}
