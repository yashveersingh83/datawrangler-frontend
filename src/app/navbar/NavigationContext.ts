export interface NavigationContext {
    userRoles: string[];
    userProfile: any;
    featureFlags?: { [key: string]: boolean };
}

export const createEmptyNavigationContext = (): NavigationContext => {
    return {
        userRoles: [],
        userProfile: {},
        featureFlags: {}
    };
};
