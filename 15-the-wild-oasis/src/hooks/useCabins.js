import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getCabins } from "../services/apiCabins";
import { deleteCabin } from "../services/apiCabins";
import toast from "react-hot-toast";

export function useCabins() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: cabins,
    error: loadingError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const { isLoading: isDeleting, mutate: handleDeleteCabin } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isLoading,
    cabins,
    loadingError,
    isDeleting,
    handleDeleteCabin,
  };
}
