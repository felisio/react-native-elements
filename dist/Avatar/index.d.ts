/// <reference types="react" />
import { Avatar, AvatarProps } from './Avatar';
import { Accessory, AccessoryProps } from './Avatar.Accessory';
declare const ThemedAvatar: (import("react").FunctionComponent<Omit<AvatarProps & Partial<import("../config").ThemeProps<AvatarProps>>, keyof import("../config").ThemeProps<T>>> | import("react").ForwardRefExoticComponent<AvatarProps & Partial<import("../config").ThemeProps<AvatarProps>>>) & {
    Accessory: import("react").FunctionComponent<Omit<Partial<import("..").IconProps> & Partial<import("..").ImageProps> & {
        underlayColor?: import("react-native").ColorValue;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    } & Partial<import("../config").ThemeProps<AccessoryProps>>, keyof import("../config").ThemeProps<T>>> | import("react").ForwardRefExoticComponent<Partial<import("..").IconProps> & Partial<import("..").ImageProps> & {
        underlayColor?: import("react-native").ColorValue;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    } & Partial<import("../config").ThemeProps<AccessoryProps>>>;
};
export { Avatar, Accessory };
export type { AccessoryProps, AvatarProps };
export default ThemedAvatar;
