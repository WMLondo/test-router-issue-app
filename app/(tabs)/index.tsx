import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useAlert } from "@/components/ui/alert/useAlert";
import { LuggleButton } from "@/components/ui/button/LuggleButton";
import { useFlight } from "@/hooks/useFlight";
import { useQueryClient } from "@tanstack/react-query";

export default function HomeScreen() {
  const { cancelCurrentFlightMutation, completeFlightMutation } = useFlight({});
  const alert = useAlert();
  const query = useQueryClient();

  const onSuccessAction = () => {
    alert.close();
    query.invalidateQueries({
      queryKey: ["flight", "detail", ""],
    });
  };

  const completeFlight = async () => {
    const abortController = new AbortController();
    await completeFlightMutation.mutateAsync(
      {
        flightId: "",
        signal: abortController.signal,
      },
      {
        onError: (error) => {
          alert.error({
            title: "Something went wrong",
            message: error.message,
            primaryButtonText: "Try again",
            primaryAction: alert.close,
          });
        },
        onSuccess: () => {
          alert.success({
            title: "Success",
            message: "Flight completed successfully",
            primaryButtonText: "Ok",
            primaryAction: onSuccessAction,
          });
        },
      }
    );
  };

  const cancelFlight = async () => {
    const abortController = new AbortController();

    await cancelCurrentFlightMutation.mutateAsync(
      {
        flightId: "",
        signal: abortController.signal,
      },
      {
        onError: (error) => {
          alert.error({
            title: "Something went wrong",
            message: error.message,
            primaryButtonText: "Try again",
            primaryAction: alert.close,
          });
        },
        onSuccess: () => {
          alert.success({
            title: "Success",
            message: "Flight cancelled successfully",
            primaryButtonText: "Ok",
            primaryAction: onSuccessAction,
          });
        },
      }
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <LuggleButton
        rightIcon="chevron-forward"
        className="mb-8 mx-8"
        isLoading={completeFlightMutation.isPending}
        disabled={completeFlightMutation.isPending}
        onPress={completeFlight}
      >
        Complete
      </LuggleButton>
      <LuggleButton
        variant="secondary"
        className="mb-[22px] mx-8"
        isLoading={cancelCurrentFlightMutation.isPending}
        disabled={cancelCurrentFlightMutation.isPending}
        onPress={cancelFlight}
      >
        Cancel
      </LuggleButton>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
