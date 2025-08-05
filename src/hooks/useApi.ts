import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from "@tanstack/react-query";
import { handleGenericError } from "@/lib/error-handler";
import {
  deleteData,
  fetchData,
  patchData,
  postData,
  updateData,
} from "@/config/api";
import { toast } from "sonner";

/**
 * Helper to invalidate queries by key (handles string or array)
 */
const invalidateQuery = (
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: QueryKey | string | undefined
) => {
  if (!queryKey) return;
  if (Array.isArray(queryKey)) {
    queryClient.invalidateQueries({ queryKey });
  } else {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
  }
};

/**
 * Centralized error handler for mutations
 */
const handleMutationError = (error: unknown) => {
  const errorMessage = handleGenericError(error);
  toast.error(errorMessage);
  // Optionally log error for debugging
  if (process.env.NODE_ENV !== "production") {
    console.error(errorMessage);
  }
  throw new Error(errorMessage);
};

/**
 * Fetch data with react-query
 */
export function useFetchData<T = unknown>(
  endpoint: string,
  queryKey: QueryKey | string,
  options: Omit<
    UseQueryOptions<T, unknown, T, QueryKey>,
    "queryKey" | "queryFn"
  > = {}
) {
  return useQuery<T, unknown, T, QueryKey>({
    queryKey: [queryKey, endpoint].filter(Boolean) as QueryKey,
    queryFn: () => fetchData<T>(endpoint),
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    ...options,
  });
}

/**
 * Create (POST) data mutation
 */
export function useCreateData<T = unknown, B = unknown>(
  endpoint: string,
  queryKey: QueryKey | string,
  options?: UseMutationOptions<T, unknown, B>
) {
  const queryClient = useQueryClient();
  return useMutation<T, unknown, B>({
    mutationFn: (data: B) => postData<T, B>(endpoint, data),
    onSuccess: (response, ...args) => {
      invalidateQuery(queryClient, queryKey);
      options?.onSuccess?.(response, ...args);
      return response;
    },
    onError: (error, ...args) => {
      handleMutationError(error);
      options?.onError?.(error, ...args);
    },
    ...options,
  });
}

/**
 * Update (PUT) data mutation
 */
export function useUpdateData<T = unknown, B = unknown>(
  endpoint: string,
  queryKey: QueryKey | string,
  options?: UseMutationOptions<T, unknown, B>
) {
  const queryClient = useQueryClient();
  return useMutation<T, unknown, B>({
    mutationFn: async (newData: B) => {
      const response = await updateData<T, B>(endpoint, newData);
      return response;
    },
    onSuccess: (response, ...args) => {
      invalidateQuery(queryClient, queryKey);
      options?.onSuccess?.(response, ...args);
      return response;
    },
    onError: (error, ...args) => {
      handleMutationError(error);
      options?.onError?.(error, ...args);
    },
    ...options,
  });
}

/**
 * Patch (PATCH) data mutation
 */
export function usePatchData<T = unknown, B = unknown>(
  endpoint: string,
  queryKey: QueryKey | string,
  options?: UseMutationOptions<T, unknown, B>
) {
  const queryClient = useQueryClient();
  return useMutation<T, unknown, B>({
    mutationFn: async (data: B) => {
      const isFormData =
        typeof FormData !== "undefined" && data instanceof FormData;
      const config = {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
        isMultipart: isFormData,
      };
      const response = await patchData<T, B>(endpoint, data, config);
      return response;
    },
    onSuccess: (response, ...args) => {
      invalidateQuery(queryClient, queryKey);
      options?.onSuccess?.(response, ...args);
      return response;
    },
    onError: (error, ...args) => {
      handleMutationError(error);
      options?.onError?.(error, ...args);
    },
    ...options,
  });
}

/**
 * Delete data mutation
 */
export function useDeleteData<T = unknown, B = unknown>(
  endpoint: string,
  queryKey: QueryKey | string,
  options?: UseMutationOptions<T, unknown, B>
) {
  const queryClient = useQueryClient();
  return useMutation<T, unknown, B>({
    mutationFn: async () => {
      const response = await deleteData<T>(endpoint);
      return response;
    },
    onSuccess: (response, ...args) => {
      invalidateQuery(queryClient, queryKey);
      options?.onSuccess?.(response, ...args);
      return response;
    },
    onError: (error, ...args) => {
      handleMutationError(error);
      options?.onError?.(error, ...args);
    },
    ...options,
  });
}

/**
 * Dynamic PATCH mutation (for endpoints that change)
 */
export function useDynamicPatchData<T = unknown, B = unknown>(
  queryKey: QueryKey | string,
  options?: UseMutationOptions<T, unknown, { endpoint: string; data: B }>
) {
  const queryClient = useQueryClient();
  return useMutation<T, unknown, { endpoint: string; data: B }>({
    mutationFn: async ({ endpoint, data }) => {
      const isFormData =
        typeof FormData !== "undefined" && data instanceof FormData;
      const config = {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
        isMultipart: isFormData,
      };
      const response = await patchData<T, B>(endpoint, data, config);
      return response;
    },
    onSuccess: (response, ...args) => {
      invalidateQuery(queryClient, queryKey);
      options?.onSuccess?.(response, ...args);
      return response;
    },
    onError: (error, ...args) => {
      handleMutationError(error);
      options?.onError?.(error, ...args);
    },
    ...options,
  });
}
