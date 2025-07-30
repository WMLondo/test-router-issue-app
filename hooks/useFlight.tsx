import { useMutation } from "@tanstack/react-query";
import { cancelPassengerFlightAction } from "../actions/cancel-passenger-flight.action";
import { completePassengerFlightAction } from "../actions/complete-passenger-flight.action";

interface Props {
  id?: string;
}

export const useFlight = ({ id }: Props) => {
  const cancelCurrentFlightMutation = useMutation({
    mutationFn: cancelPassengerFlightAction,
  });

  const completeFlightMutation = useMutation({
    mutationFn: completePassengerFlightAction,
  });

  return {
    cancelCurrentFlightMutation,
    completeFlightMutation,
  };
};
