import type { UseFetchOptions } from "#app";

export function useApi<T = unknown>(
  request: string | Ref<string>,
  options: UseFetchOptions<T>
) {
  const toast = useToast();
  const session = useSession();
  return useFetch(request, {
    onRequest({ options }) {
      if (session.token) {
        options.headers.set("Authorization", `Bearer ${session.token}`);
      }
    },
    onResponseError({ response }) {
      if (response._data.meta?.messages?.[0]) {
        toast.add({
          color: "red",
          title: response._data.meta.messages[0],
        });
      }
    },
    retry: false,
    ...options,
  });
}

// const {} = useFetch('/api/cors-solving', {
//     headers: {
//         a: 'token'
//     }
// })

// const {} = useFetch('/api/cors-solving-1', {
//     headers: {
//         a: 'token'
//     }
// })

// const {data} = useApi('/get-product')
