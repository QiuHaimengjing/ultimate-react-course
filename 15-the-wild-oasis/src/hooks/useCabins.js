import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getCabins } from "../services/apiCabins";
import { deleteCabin } from "../services/apiCabins";
import { createEditCabin } from "../services/apiCabins";

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
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading: isEditing, mutate: handleEditCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("New cabin successfully edited");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  return {
    isLoading,
    cabins,
    loadingError,
    isDeleting,
    handleDeleteCabin,
    isWorking,
    handleCreateCabin,
    handleEditCabin,
  };
}
