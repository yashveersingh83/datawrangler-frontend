import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { HttpContextToken } from '@angular/common/http';
import { LoadingindicatorService } from '../utils/loading-indicator';

// Define a context token for controlling the loader
export const SHOW_LOADER = new HttpContextToken<boolean>(() => true);

// Define the functional interceptor
export const loadingindicationInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingindicatorService); // Use `inject` to access services
  const showLoader = req.context.get(SHOW_LOADER);

  if (showLoader) {
    loadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (showLoader) {
        loadingService.hide();
      }
    })
  );
};
