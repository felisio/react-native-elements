/// <reference types="react" />
import { Badge, BadgeProps } from './Badge';
import { withBadge } from './withBadge';
export { Badge, withBadge };
export type { BadgeProps };
declare const _default: import("react").FunctionComponent<Omit<BadgeProps & Partial<import("../config").ThemeProps<BadgeProps>>, keyof import("../config").ThemeProps<T>>> | import("react").ForwardRefExoticComponent<BadgeProps & Partial<import("../config").ThemeProps<BadgeProps>>>;
export default _default;
