import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";
import { luggleButtonStyles } from "./LuggleButtonStyle";

interface Props extends PressableProps {
  className?: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  children?: React.ReactNode;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export function LuggleButton(props: Props) {
  const {
    isLoading = false,
    disabled,
    onPress,
    children,
    variant,
    rightIcon,
    className,
    ...restProps
  } = props;

  if (variant === "tertiary") {
    return (
      <Pressable
        {...restProps}
        className={`rounded-full overflow-hidden ${isLoading ? "animate-ping" : ""} py-[20px] flex justify-center items-center bg-border ${className}`}
        onPress={onPress}
        disabled={disabled}
        style={[{ opacity: disabled ? 0.9 : 1 }]}
      >
        <Text className="text-text font-bold">
          {isLoading ? (
            <ActivityIndicator size={24} color="#32201b" />
          ) : (
            children
          )}
        </Text>
      </Pressable>
    );
  }

  if (variant === "secondary") {
    return (
      <Pressable
        {...restProps}
        className={`rounded-full overflow-hidden py-[20px] flex justify-center items-center bg-text ${isLoading ? "animate-ping" : ""} ${className}`}
        onPress={onPress}
        disabled={disabled}
        style={[{ opacity: disabled ? 0.9 : 1 }]}
      >
        <Text className="text-background font-bold">{children}</Text>
        {rightIcon && (
          <View className="bg-white rounded-full w-[51px] h-[51px] absolute top-[4px] right-[4px] flex justify-center items-center">
            {isLoading ? (
              <ActivityIndicator size={24} color="#32201b" />
            ) : (
              <Ionicons name={rightIcon!} size={24} color="#32201b" />
            )}
          </View>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      {...restProps}
      className={`rounded-full overflow-hidden ${className}`}
      style={[luggleButtonStyles.button, { opacity: disabled ? 0.9 : 1 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={["#ff6e44", "#ff8c44"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="py-[20px] flex justify-center items-center"
      >
        <Text
          className="text-background font-bold"
          style={luggleButtonStyles.buttonContent}
        >
          {children}
        </Text>
        {rightIcon && (
          <View className="bg-white rounded-full w-[51px] h-[51px] absolute top-[4px] right-[4px] flex justify-center items-center">
            {isLoading ? (
              <ActivityIndicator size={24} color="#ff6e44" />
            ) : (
              <Ionicons name={rightIcon!} size={24} color="#ff6e44" />
            )}
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
}
