-- Drop and recreate orders table
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
  restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
  order_date TIMESTAMP NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  delivery BOOLEAN NOT NULL,
  quantity INT NOT NULL
);
