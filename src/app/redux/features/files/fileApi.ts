/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import {
  FilesResponse,
  SingleFileResponse,
  UploadFilePayload,
  UpdateFilePayload,
  CreateShareLinkPayload,
  ShareLinkResponse,
  ActivityLogResponse,
  SearchFilesParams,
  SharedFileResponse,
} from "./file.type";

export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<any, UploadFilePayload>({
      query: ({ file, folderId }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folderId", folderId);
        return { url: "/files/upload", method: "POST", body: formData };
      },
      invalidatesTags: ["File", "Folder", "Dashboard"],
    }),

    getFiles: builder.query<FilesResponse, { folderId: string }>({
      query: ({ folderId }) => ({
        url: `/files?folderId=${folderId}`,
        method: "GET",
      }),
      providesTags: ["Folder", "File"],
    }),

    searchFiles: builder.query<FilesResponse, SearchFilesParams>({
      query: ({ q, page = 1, limit = 20 }) => ({
        url: `/files/search?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["File"],
    }),

    getSingleFile: builder.query<SingleFileResponse, string>({
      query: (id) => ({ url: `/files/${id}`, method: "GET" }),
      providesTags: ["Folder", "File"],
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
      query: (id) => ({ url: `/files/${id}`, method: "DELETE" }),
      invalidatesTags: ["File", "Folder", "Dashboard"],
    }),

    permanentDeleteFile: builder.mutation<any, string>({
      query: (id) => ({ url: `/files/${id}/permanent`, method: "DELETE" }),
      invalidatesTags: ["File", "Folder", "Dashboard"],
    }),

    restoreFile: builder.mutation<any, string>({
      query: (id) => ({ url: `/files/${id}/restore`, method: "PATCH" }),
      invalidatesTags: ["File", "Folder", "Dashboard"],
    }),

    getTrashFiles: builder.query<FilesResponse, void>({
      query: () => ({ url: "/files/trash", method: "GET" }),
      providesTags: ["Folder", "File"],
    }),

    // Share links
    createShareLink: builder.mutation<
      ShareLinkResponse,
      CreateShareLinkPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/files/${id}/share`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["File"],
    }),

    revokeShareLink: builder.mutation<any, string>({
      query: (token) => ({
        url: `/files/share/${token}/revoke`,
        method: "DELETE",
      }),
      invalidatesTags: ["File"],
    }),

    getSharedFile: builder.query<SharedFileResponse, string>({
      query: (token) => ({ url: `/files/share/${token}`, method: "GET" }),
    }),

    // Activity log
    getActivityLog: builder.query<
      ActivityLogResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/files/activity?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["File"],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFilesQuery,
  useSearchFilesQuery,
  useGetSingleFileQuery,
  useUpdateFileMutation,
  useDeleteFileMutation,
  usePermanentDeleteFileMutation,
  useRestoreFileMutation,
  useGetTrashFilesQuery,
  useCreateShareLinkMutation,
  useRevokeShareLinkMutation,
  useGetSharedFileQuery,
  useGetActivityLogQuery,
} = fileApi;
