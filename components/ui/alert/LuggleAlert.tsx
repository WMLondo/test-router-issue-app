import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { LuggleButton } from "../button/LuggleButton";

interface StateIcon {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export interface AlertProps {
  title: string;
  message: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryAction?: () => void;
  secondaryAction?: () => void;
  type: "error" | "info" | "success" | "warning";
  visible: boolean;
  secondaryButton?: boolean;
}

interface Props extends AlertProps {
  close: () => void;
}

const LuggleAlert = (props: Props) => {
  const {
    visible = false,
    secondaryButton = false,
    primaryAction,
    secondaryAction,
    message,
    primaryButtonText,
    secondaryButtonText,
    title,
    type,
    close,
  } = props;

  const loadStateIcon = () => {
    let stateIcon: StateIcon = { color: "#ff6e44", icon: "alert" };

    switch (type) {
      case "info":
        stateIcon = { color: "#32201b", icon: "alert" };
        break;
      case "error":
        stateIcon = { color: "#ff4444", icon: "alert" };
        break;
      case "success":
        stateIcon = { color: "#ff6e44", icon: "checkmark" };
        break;
      case "warning":
        stateIcon = { color: "#32201b", icon: "warning-outline" };
        break;
    }

    return stateIcon;
  };

  const stateIcon = loadStateIcon();

  const { width } = useWindowDimensions();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      transparent
    >
      <Pressable
        onPress={close}
        className="flex-1 p-8 justify-center items-center bg-modal-background"
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View
            style={{ width: width - 32 }}
            className="relative flex flex-col px-6 py-4 bg-background rounded-[32px]"
          >
            <Ionicons
              size={56}
              name={stateIcon.icon}
              color={stateIcon.color}
              className="mb-6"
            />
            <Ionicons
              size={24}
              name="close"
              color="#32201b"
              className="p-[18px] absolute top-4 right-6"
              onPress={close}
            />
            <Text className="text-text font-bold text-2xl mb-2">{title}</Text>
            <Text className="text-text mb-6">{message}</Text>
            {secondaryButton && (
              <LuggleButton
                variant="tertiary"
                className="py-4 mb-6"
                onPress={secondaryAction}
              >
                {secondaryButtonText}
              </LuggleButton>
            )}
            <LuggleButton
              variant="secondary"
              className="py-4"
              onPress={primaryAction}
            >
              {primaryButtonText}
            </LuggleButton>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default LuggleAlert;
