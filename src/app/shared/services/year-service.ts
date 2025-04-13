import { Injectable } from '@angular/core';

import { Years } from '../manager-model';

@Injectable({
  providedIn: 'root'
})
export class YearService {
  currentyear: Years = { year: 2023, description: 'Year of Innovation' };
  constructor() { }

  getYears(): Years[] {
    // Example data, replace with actual data source (e.g., API call)
    return [
      { year: 2020, description: 'Year of the Pandemic' },
      { year: 2021, description: 'Year of Recovery' },
      { year: 2022, description: 'Year of Growth' },
      { year: 2023, description: 'Year of Innovation' },
      { year: 2024, description: 'Year of Innovation' },
      { year: 2025, description: 'Year of Innovation' },

    ];
  }
  getYear(key: any): Years {
    // Convert the key to a string (if it's not already) for comparison
    const searchKey = key.toString().toLowerCase();

    // Find the first year that matches the search key
    const foundYear = this.getYears().find(year => 
      year.year.toString().toLowerCase() === searchKey
    );

    // Return the found year or the fallback value (currentyear)
    return foundYear || this.currentyear;
  }
}