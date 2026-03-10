/*
  # Create reservations table

  1. New Tables
    - `reservations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `parking_id` (integer)
      - `parking_name` (text)
      - `parking_location` (text)
      - `reservation_date` (date)
      - `start_time` (time)
      - `end_time` (time)
      - `total_price` (numeric)
      - `status` (text, enum: pending, confirmed, cancelled)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `reservations` table
    - Add policies for users to read and manage their own reservations
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parking_id integer NOT NULL,
  parking_name text NOT NULL,
  parking_location text NOT NULL,
  reservation_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  total_price numeric(10, 2) NOT NULL,
  status text DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reservations"
  ON reservations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reservations"
  ON reservations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_reservations_user_id ON reservations(user_id);
CREATE INDEX idx_reservations_date ON reservations(reservation_date);
