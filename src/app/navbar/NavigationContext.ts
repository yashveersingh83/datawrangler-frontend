export interface NavigationContext {
    userRoles: string[];
    userProfile: any;
    featureFlags?: { [key: string]: boolean; };
    //appMode?: 'admin' | 'user' | 'readonly'|null;
}
