-- Drop and recreate order_items table
DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_id INT REFERENCES menus(id) ON DELETE CASCADE,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  item_quantity INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status INTEGER DEFAULT 0
);
