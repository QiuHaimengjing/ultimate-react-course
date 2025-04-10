import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getCabins } from "../services/apiCabins";
import { deleteCabin } from "../services/apiCabins";
import { createCabin } from "../services/apiCabins";

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

  const { isLoading: isCreating, mutate: handleCreateCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isLoading,
    cabins,
    loadingError,
    isDeleting,
    handleDeleteCabin,
    isCreating,
    handleCreateCabin,
  };
}
