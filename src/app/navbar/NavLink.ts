import { NavigationContext } from './NavigationContext';

export interface NavLink {
    label: string;
    route: string;
    icon?: string;
    order?: number;
    isVisible: (context: NavigationContext) => boolean;
}
