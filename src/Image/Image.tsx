import React, { useCallback } from 'react';
import {
  Animated,
  Image as ImageNative,
  ImageLoadEventData,
  ImageProps as RNImageProps,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from '..';
import { RneFunctionComponent } from '../helpers';

export type ImageProps = RNImageProps & {
  /** Define the component passed to image. */
  Component?: typeof React.Component;

  /** Callback function when pressing component. */
  onPress?(): void;

  /** Callback function when long pressing component. */
  onLongPress?(): void;

  /** Specify a different component as the Image component. */
  ImageComponent?: typeof React.Component;

  /** Content to load when Image is rendering. */
  PlaceholderContent?: React.ReactElement<any>;

  /** Additional styling for the container. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Additional styling for the children container. */
  childrenContainerStyle?: StyleProp<ViewStyle>;

  /** Additional styling for the placeholder container. */
  placeholderStyle?: StyleProp<ViewStyle>;

  /** Perform fade transition on image load. */
  transition?: boolean;

  /** Perform fade transition on image load. */
  transitionDuration?: number;
};

/** Drop-in replacement for the standard React Native Image component that displays
images with a placeholder and smooth image load transitioning. */
export const Image: RneFunctionComponent<ImageProps> = ({
  onPress,
  onLongPress,
  Component = onPress || onLongPress ? TouchableOpacity : View,
  placeholderStyle,
  PlaceholderContent,
  containerStyle,
  childrenContainerStyle = null,
  style = {},
  ImageComponent = ImageNative,
  onLoad,
  children,
  transition,
  transitionDuration = 360,
  ...props
}) => {
  const root = React.useRef<ImageNative>(null);
  const placeholderOpacity = React.useRef(new Animated.Value(1));

  const onLoadHandler = useCallback(
    (event: NativeSyntheticEvent<ImageLoadEventData>) => {
      if (transition) {
        Animated.timing(placeholderOpacity.current, {
          toValue: 0,
          duration: transitionDuration,
          useNativeDriver: true,
        }).start();
      } else {
        placeholderOpacity.current.setValue(0);
      }
      onLoad?.(event);
    },
    [transition, transitionDuration, onLoad]
  );

  const hasImage = Boolean(props.source);

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityIgnoresInvertColors={true}
      style={StyleSheet.flatten([styles.container, containerStyle])}
    >
      <ImageComponent
        ref={root}
        testID="RNE__Image"
        {...props}
        {...{ transition, transitionDuration }}
        onLoad={onLoadHandler}
        style={StyleSheet.flatten([StyleSheet.absoluteFill, style])}
      />
      {/* Transition placeholder */}
      <Animated.View
        pointerEvents={hasImage ? 'none' : 'auto'}
        accessibilityElementsHidden={hasImage}
        importantForAccessibility={hasImage ? 'no-hide-descendants' : 'yes'}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: hasImage ? placeholderOpacity.current : 1,
          },
        ]}
      >
        <View
          testID="RNE__Image__placeholder"
          style={StyleSheet.flatten([
            style,
            styles.placeholder,
            placeholderStyle,
          ])}
        >
          {React.isValidElement(PlaceholderContent)
            ? PlaceholderContent
            : PlaceholderContent && (
                <Text testID="RNE__Image__Placeholder__Content">
                  {PlaceholderContent}
                </Text>
              )}
        </View>
      </Animated.View>
      {/* Children for Image */}
      <View
        testID="RNE__Image__children__container"
        style={childrenContainerStyle ?? style}
      >
        {children}
      </View>
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  placeholder: {
    backgroundColor: '#bdbdbd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Image.displayName = 'Image';
