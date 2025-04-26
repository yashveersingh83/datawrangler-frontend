// navigation.config.ts

import { NavigationContext } from './NavigationContext';
import { NavLink } from './NavLink';
export const NAV_LINKS: NavLink[] = [
  {
    label: 'Home',
    route: '/home',
    isVisible: (ctx: NavigationContext) =>
      ctx.userRoles.includes('Analyst') ,
  },
  {
    label: 'Information Request',
    route: '/analyst/informationrequest',
    isVisible: (ctx: NavigationContext) =>
      ctx.userRoles.includes('Analyst') || ctx.userRoles.includes('Approver') || ctx.userRoles.includes('Coordinator'),
  },
  {
    label: 'Submissions',
    route: '/coordinator/submission',
    isVisible: (ctx: NavigationContext) =>
        ctx.userRoles.includes('Analyst') || ctx.userRoles.includes('Approver') || ctx.userRoles.includes('Coordinator'),
  },
  {
    label: 'Recipients',
    route: '/coordinator/recepient',
    isVisible: (ctx: NavigationContext) =>
      ctx.userRoles.includes('Approver') || ctx.userRoles.includes('Coordinator'),
  },
  {
    label: 'Managers',
    route: '/analyst/manager',
    isVisible: (ctx: NavigationContext) =>
      ctx.userRoles.includes('Analyst'),
  },
  {
    label: 'Milestone',
    route: '/analyst/milestones',
    isVisible: (ctx: NavigationContext) =>
    ctx.userRoles.includes('Analyst'),
  },
];
