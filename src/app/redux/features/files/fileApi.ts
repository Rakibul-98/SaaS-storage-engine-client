/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import {
  FilesResponse,
  SingleFileResponse,
  UploadFilePayload,
  UpdateFilePayload,
} from "./file.type";

export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<any, UploadFilePayload>({
      query: ({ file, folderId }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folderId", folderId);

        return {
          url: "/files/upload",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["File", "Folder"],
    }),

    getFiles: builder.query<FilesResponse, void>({
      query: () => ({
        url: "/files",
        method: "GET",
      }),
      providesTags: ["Folder", "File"],
    }),

    getSingleFile: builder.query<SingleFileResponse, string>({
      query: (id) => ({
        url: `/files/${id}`,
        method: "GET",
      }),
      providesTags: ["Folder", "File"],
    }),

    downloadFile: builder.query<Blob, string>({
      query: (id) => ({
        url: `/files/${id}/download`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),

    updateFile: builder.mutation<any, UpdateFilePayload>({
      query: ({ id, ...data }) => ({
        url: `/files/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["File", "Folder"],
    }),

    deleteFile: builder.mutation<any, string>({
      query: (id) => ({
        url: `/files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["File", "Folder"],
    }),

    permanentDeleteFile: builder.mutation<any, string>({
      query: (id) => ({
        url: `/files/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: ["File", "Folder"],
    }),

    restoreFile: builder.mutation<any, string>({
      query: (id) => ({
        url: `/files/${id}/restore`,
        method: "PATCH",
      }),
      invalidatesTags: ["File", "Folder"],
    }),

    getTrashFiles: builder.query<FilesResponse, void>({
      query: () => ({
        url: "/files/trash",
        method: "GET",
      }),
      providesTags: ["Folder", "File"],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFilesQuery,
  useGetSingleFileQuery,
  useDownloadFileQuery,
  useUpdateFileMutation,
  useDeleteFileMutation,
  usePermanentDeleteFileMutation,
  useRestoreFileMutation,
  useGetTrashFilesQuery,
} = fileApi;
