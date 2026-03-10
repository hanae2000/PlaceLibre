import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';
import { MapPin, Calendar, Clock, DollarSign, CircleAlert as AlertCircle, Loader } from 'lucide-react';

export const ReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { parking } = location.state || {};

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!parking) {
      navigate('/search');
    }
  }, [parking, navigate]);

  const calculatePrice = () => {
    if (!startTime || !endTime || !parking) return 0;

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const startTotalMin = startHour * 60 + startMin;
    const endTotalMin = endHour * 60 + endMin;

    if (endTotalMin <= startTotalMin) return 0;

    const hours = (endTotalMin - startTotalMin) / 60;
    return (hours * parking.pricing.hourlyRate).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!date || !startTime || !endTime) {
      setError('Please fill in all fields');
      return;
    }

    const price = calculatePrice();
    if (price === 0 || parseFloat(price) < 0) {
      setError('Invalid time range. End time must be after start time.');
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('reservations')
        .insert([
          {
            user_id: user.id,
            parking_id: parking.id,
            parking_name: parking.name,
            parking_location: parking.address,
            reservation_date: date,
            start_time: startTime,
            end_time: endTime,
            total_price: parseFloat(price),
            status: 'confirmed'
          }
        ]);

      if (insertError) {
        setError(insertError.message);
        return;
      }

      navigate('/reservations', {
        state: { message: `Reservation confirmed! Total: $${price}` }
      });
    } catch (err) {
      setError('Failed to create reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!parking) {
    return null;
  }

  const price = calculatePrice();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate('/search')}
          className="text-blue-600 hover:text-blue-700 font-medium mb-6 flex items-center gap-1"
        >
          ← Back to search
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Reserve Parking</h1>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-blue-900">Selected Parking</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{parking.name}</p>
              <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {parking.address}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Reservation Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input-field pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="input-field pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    End Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="input-field pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center gap-2 mt-6"
              >
                {loading && <Loader className="w-5 h-5 animate-spin" />}
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>
          </div>

          <div className="card p-8 h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Reservation Summary</h2>

            <div className="space-y-4 pb-6 border-b border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-600">Location</span>
                <span className="font-medium text-slate-900">{parking.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date</span>
                <span className="font-medium text-slate-900">{date || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Time</span>
                <span className="font-medium text-slate-900">
                  {startTime && endTime ? `${startTime} - ${endTime}` : 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Hourly Rate</span>
                <span className="font-medium text-slate-900">${parking.pricing.hourlyRate}/hr</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-blue-600 flex items-center gap-2">
                <DollarSign className="w-7 h-7" />
                {price || '0.00'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
