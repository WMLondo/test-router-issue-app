interface Props {
  flightId: string;
  signal: AbortSignal;
}

export const cancelPassengerFlightAction = async ({
  flightId,
  signal,
}: Props) => {
  return [];
};
