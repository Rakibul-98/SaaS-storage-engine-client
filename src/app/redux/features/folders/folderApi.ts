/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import {
  CreateFolderPayload,
  GetFoldersResponse,
  GetFolderTreeResponse,
  GetSingleFolderResponse,
  UpdateFolderPayload,
} from "./folder.types";

export const folderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation<any, CreateFolderPayload>({
      query: (data) => ({
        url: "/folders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Folder"],
    }),

    getFolders: builder.query<GetFoldersResponse, void>({
      query: () => ({
        url: "/folders",
        method: "GET",
      }),
      providesTags: ["Folder"],
    }),

    getFolderTree: builder.query<GetFolderTreeResponse, void>({
      query: () => ({
        url: "/folders/tree",
        method: "GET",
      }),
      providesTags: ["Folder"],
    }),

    getSingleFolder: builder.query<GetSingleFolderResponse, string>({
      query: (id) => ({
        url: `/folders/${id}`,
        method: "GET",
      }),
      providesTags: ["Folder"],
    }),

    updateFolder: builder.mutation<any, UpdateFolderPayload>({
      query: ({ id, ...data }) => ({
        url: `/folders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Folder"],
    }),

    deleteFolder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/folders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Folder"],
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useGetFoldersQuery,
  useGetFolderTreeQuery,
  useGetSingleFolderQuery,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} = folderApi;
