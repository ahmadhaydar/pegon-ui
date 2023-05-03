import { useToast } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useFetchQuery = (key, fetcher, options) => {
  const createToast = useToast();
  const router = useRouter();
  return useQuery({
    queryKey: key,
    queryFn: fetcher,
    onError: (error) => {
      if (error.response.status === 401) {
        router.push("/");
      }
      createToast({
        title: "Error",
        description: error.message,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    },
    ...options,
  });
};

export const useFetchMutation = (fetcher, options) => {
  const createToast = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: fetcher,
    onError: (error) => {
      if (error.response.status === 401) {
        router.push("/");
      }
      createToast({
        title: "Error",
        description: error.message,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    },
    ...options,
  });
};
