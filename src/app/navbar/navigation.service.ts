// navigation.service.ts

import { Injectable } from '@angular/core';
import { NAV_LINKS } from './navigation.config';
import { NavLink } from './NavLink';
import { NavigationContext } from './NavigationContext';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  getVisibleLinks(context: NavigationContext): NavLink[] {
    return NAV_LINKS.filter(link => link.isVisible(context));
  }
}


