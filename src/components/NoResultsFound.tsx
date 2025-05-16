import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface NoResultsFoundProps {
  searchQuery?: string;
  city?: string;
  onClearFilters?: () => void;
  onTryDifferentSearch?: () => void;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({
  searchQuery,
  city,
  onClearFilters,
  onTryDifferentSearch
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No restaurants found
          </h3>

          <p className="text-gray-600 mb-4">
            {searchQuery && city ? (
              <>
                We couldn't find any restaurants matching "{searchQuery}" in {city}.
              </>
            ) : city ? (
              <>
                We couldn't find any restaurants in {city}.
              </>
            ) : (
              "We couldn't find any restaurants matching your search criteria."
            )}
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>Try searching for a different city or cuisine</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Filter className="w-4 h-4" />
              <span>Clear filters to see more results</span>
            </div>
          </div>

          <div className="flex gap-2 justify-center mt-6">
            {onClearFilters && (
              <Button
                onClick={onClearFilters}
                variant="outline"
                size="sm"
              >
                Clear Filters
              </Button>
            )}

            {onTryDifferentSearch && (
              <Button
                onClick={onTryDifferentSearch}
                size="sm"
              >
                Try Different Search
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoResultsFound; 