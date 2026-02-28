/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import RenameFileDialog from "./RenameFileDialog";
import MoveFileDialog from "./MoveFileDialog";
import DeleteFileDialog from "./DeleteFileDialog";

export default function FileActions({ file }: any) {
  return (
    <>
      <DropdownMenuItem asChild>
        <RenameFileDialog file={file} />
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <MoveFileDialog file={file} />
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <DeleteFileDialog file={file} />
      </DropdownMenuItem>
    </>
  );
}
