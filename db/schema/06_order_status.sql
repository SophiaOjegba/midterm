-- Drop and recreate order_status table
DROP TABLE IF EXISTS order_status CASCADE;

CREATE TABLE order_status (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  ordered TIMESTAMP NOT NULL,
  estimated_fulfillment_time INT NOT NULL,
  ready BOOLEAN NOT NULL
);
