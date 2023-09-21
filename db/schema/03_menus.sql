-- Drop and recreate menus table
DROP TABLE IF EXISTS menus CASCADE;

CREATE TABLE menus (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(8, 2) NOT NULL,
  quantity INT NOT NULL,
  food_image_url VARCHAR(255) NOT NULL,
  cuisine_type VARCHAR(255) NOT NULL
);
