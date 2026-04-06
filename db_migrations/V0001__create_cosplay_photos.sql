CREATE TABLE t_p54563436_cosplay_journal_app.cosplay_photos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  character_name VARCHAR(255),
  category VARCHAR(50) DEFAULT 'КОСПЛЕЙ',
  image_url TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);