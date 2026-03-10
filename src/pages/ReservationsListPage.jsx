import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';
import { Calendar, MapPin, Clock, DollarSign, Trash2, AlertCircle, Loader, CheckCircle } from 'lucide-react';

export const ReservationsListPage = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReservations = async () => {
    if (!user) return;

    try {
      const { data, error: fetchError } = await supabase
        .from('reservations')
        .select('*')
        .eq('user_id', user.id)
        .order('reservation_date', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setReservations(data || []);
      }
    } catch (err) {
      setError('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('reservations')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) {
        setError(deleteError.message);
      } else {
        setReservations(reservations.filter(r => r.id !== id));
      }
    } catch (err) {
      setError('Failed to cancel reservation');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Reservations</h1>
        <p className="text-slate-600 mb-8">Manage your parking reservations</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {reservations.length === 0 ? (
          <div className="card p-12 text-center">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No reservations yet</h2>
            <p className="text-slate-600 mb-6">Start by booking a parking space</p>
            <a href="/search" className="btn-primary justify-center">
              Search Parking
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map(reservation => (
              <div key={reservation.id} className="card p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {reservation.parking_name}
                      </h3>
                      {reservation.status === 'confirmed' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          Confirmed
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {reservation.parking_location}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{new Date(reservation.reservation_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{reservation.start_time} - {reservation.end_time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold">${reservation.total_price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancel(reservation.id)}
                    className="btn-secondary gap-2 self-start md:self-auto whitespace-nowrap"
                  >
                    <Trash2 className="w-4 h-4" />
                    Cancel
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
