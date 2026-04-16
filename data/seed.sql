
INSERT INTO categories (name, parent_id)
VALUES 
  ('Elektronik', NULL),
  ('Fashion', NULL),
  ('Rumah Tangga', NULL),
  ('Olahraga', NULL),
  ('Buku & Alat Tulis', NULL),
  ('Kesehatan & Kecantikan', NULL),
  ('Mainan & Hobi', NULL),
  ('Otomotif', NULL),
  ('Makanan & Minuman', NULL),
  ('Perawatan Bayi', NULL);

-- Insert sub-categories (child) for each parent
-- Elektronik (id=1)
INSERT INTO categories (name, parent_id) VALUES
  ('Smartphone', 1), ('Laptop', 1), ('Aksesoris HP', 1), ('Audio', 1), ('Kamera', 1);
-- Fashion (id=2)
INSERT INTO categories (name, parent_id) VALUES
  ('Pria', 2), ('Wanita', 2), ('Anak', 2), ('Sepatu', 2), ('Tas', 2);
-- Rumah Tangga (id=3)
INSERT INTO categories (name, parent_id) VALUES
  ('Peralatan Masak', 3), ('Pembersih', 3), ('Dekorasi', 3), ('Perabot', 3);
-- Olahraga (id=4)
INSERT INTO categories (name, parent_id) VALUES
  ('Lari', 4), ('Sepak Bola', 4), ('Basket', 4), ('Fitness', 4), ('Renang', 4);
-- Buku & Alat Tulis (id=5)
INSERT INTO categories (name, parent_id) VALUES
  ('Fiksi', 5), ('Non Fiksi', 5), ('Buku Pelajaran', 5), ('Alat Tulis', 5);
-- Kesehatan & Kecantikan (id=6)
INSERT INTO categories (name, parent_id) VALUES
  ('Skincare', 6), ('Makeup', 6), ('Vitamin', 6), ('Perawatan Rambut', 6);
-- Mainan & Hobi (id=7)
INSERT INTO categories (name, parent_id) VALUES
  ('Action Figure', 7), ('Puzzle', 7), ('Kerajinan', 7), ('Board Game', 7);
-- Otomotif (id=8)
INSERT INTO categories (name, parent_id) VALUES
  ('Aksesoris Mobil', 8), ('Oli', 8), ('Ban', 8), ('Perawatan', 8);
-- Makanan & Minuman (id=9)
INSERT INTO categories (name, parent_id) VALUES
  ('Snack', 9), ('Minuman', 9), ('Makanan Instan', 9), ('Bumbu Dapur', 9);
-- Perawatan Bayi (id=10)
INSERT INTO categories (name, parent_id) VALUES
  ('Popok', 10), ('Susu Bayi', 10), ('Mainan Bayi', 10), ('Perlengkapan Mandi', 10);


INSERT INTO products (name, description, price, stock, category_id, created_at)
SELECT 
  'Produk ' || i AS name,
  'Deskripsi untuk produk ' || i || ' ini adalah produk berkualitas tinggi.' AS description,
  (random() * 500000 + 10000)::int AS price,  -- harga 10.000 - 510.000
  (random() * 200)::int AS stock,              -- stok 0 - 200
  (floor(random() * 40) + 11)::int AS category_id,  -- kategori id antara 11 s.d. 50 (asumsi child category)
  NOW() - (random() * 365 || ' days')::interval AS created_at
FROM generate_series(1, 100) AS i;

-- Buat index untuk performa query (jika belum ada)
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);