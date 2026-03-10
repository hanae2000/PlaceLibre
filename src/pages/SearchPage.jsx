import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Navigation2, Loader } from 'lucide-react';

const mockParkings = [
  { id: 1, name: 'Downtown Central', city: 'New York', availableSpots: 12, totalSpots: 50, pricing: { hourlyRate: 5 }, address: '123 Main St', rating: 4.8 },
  { id: 2, name: 'Airport Plaza', city: 'Los Angeles', availableSpots: 8, totalSpots: 100, pricing: { hourlyRate: 3 }, address: '456 Airport Rd', rating: 4.5 },
  { id: 3, name: 'Harbor View', city: 'San Francisco', availableSpots: 3, totalSpots: 30, pricing: { hourlyRate: 7 }, address: '789 Harbor St', rating: 4.9 },
  { id: 4, name: 'Tech Park', city: 'Austin', availableSpots: 25, totalSpots: 60, pricing: { hourlyRate: 4 }, address: '321 Tech Ave', rating: 4.6 },
  { id: 5, name: 'Riverside Deck', city: 'Denver', availableSpots: 15, totalSpots: 80, pricing: { hourlyRate: 3.5 }, address: '654 River Blvd', rating: 4.7 },
];

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredParkings, setFilteredParkings] = useState(mockParkings);
  const [loading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = mockParkings.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.city.toLowerCase().includes(query) ||
      p.address.toLowerCase().includes(query)
    );
    setFilteredParkings(filtered);
  };

  const handleReserve = (parking) => {
    navigate('/reserve', { state: { parking } });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Find Your Parking</h1>
          <p className="text-slate-600 text-lg mb-8">Browse available parking spaces in your area</p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-3.5 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Search by location, parking name..."
              value={searchQuery}
              onChange={handleSearch}
              className="input-field pl-14 text-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : filteredParkings.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No parking found</h2>
            <p className="text-slate-600">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParkings.map(parking => (
              <div key={parking.id} className="card overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-40 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-blue-200" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{parking.name}</h3>
                      <p className="text-sm text-slate-600">{parking.city}</p>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                      {parking.rating} ★
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 flex items-center gap-2">
                    <Navigation2 className="w-4 h-4" />
                    {parking.address}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-t border-b border-slate-200">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Available</p>
                      <p className="text-lg font-bold text-blue-600">{parking.availableSpots}/{parking.totalSpots}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Hourly Rate</p>
                      <p className="text-lg font-bold text-slate-900 flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {parking.pricing.hourlyRate}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleReserve(parking)}
                    className="btn-primary w-full justify-center"
                    disabled={parking.availableSpots === 0}
                  >
                    {parking.availableSpots === 0 ? 'No Spots Available' : 'Reserve Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
