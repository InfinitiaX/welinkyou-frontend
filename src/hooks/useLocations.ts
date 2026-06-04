import { useState, useEffect } from "react";
import api from "@/services/api";

export interface Country {
  id: number;
  code: string;
  name: string;
  flag: string;
  order: number;
}

export interface City {
  id: number;
  code: string;
  name: string;
  order: number;
}

export interface CountryWithCities extends Country {
  cities: City[];
}

// Interface for paginated API response
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Fallback data in case API is not available
const fallbackCountries: Country[] = [
  { id: 1, code: "france", name: "France", flag: "🇫🇷", order: 1 },
  { id: 2, code: "maroc", name: "Maroc", flag: "🇲🇦", order: 2 },
];

const fallbackCities: Record<string, City[]> = {
  france: [
    { id: 1, code: "all", name: "Toutes les villes", order: 0 },
    { id: 2, code: "paris", name: "Paris", order: 1 },
    { id: 3, code: "lyon", name: "Lyon", order: 2 },
    { id: 4, code: "marseille", name: "Marseille", order: 3 },
  ],
  maroc: [
    { id: 5, code: "all", name: "Toutes les villes", order: 0 },
    { id: 6, code: "casablanca", name: "Casablanca", order: 1 },
    { id: 7, code: "rabat", name: "Rabat", order: 2 },
    { id: 8, code: "marrakech", name: "Marrakech", order: 3 },
  ],
};

export const useLocations = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [citiesByCountry, setCitiesByCountry] = useState<Record<string, City[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch countries with cities in one request
        const response = await api.get<PaginatedResponse<CountryWithCities>>("/core/countries/with-cities/");
        const data = response.results;
        
        const countriesData = data.map((c) => ({
          id: c.id,
          code: c.code,
          name: c.name,
          flag: c.flag,
          order: c.order,
        }));

        const citiesData: Record<string, City[]> = {};
        data.forEach((country) => {
          citiesData[country.code] = country.cities.sort((a, b) => a.order - b.order);
        });

        setCountries(countriesData.sort((a, b) => a.order - b.order));
        setCitiesByCountry(citiesData);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
        setError("Impossible de charger les localisations");
        // Use fallback data
        setCountries(fallbackCountries);
        setCitiesByCountry(fallbackCities);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const getCitiesForCountry = (countryCode: string): City[] => {
    return citiesByCountry[countryCode] || [];
  };

  return {
    countries,
    citiesByCountry,
    getCitiesForCountry,
    isLoading,
    error,
  };
};

export default useLocations;
