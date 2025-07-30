-- Create events table for CS Chapter
CREATE TABLE IF NOT EXISTS cs_events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  attendees INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create committee_members table for CS Chapter
CREATE TABLE IF NOT EXISTS cs_committee_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  facebook TEXT,
  email VARCHAR(255),
  linkedin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS cs_admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample CS committee members
INSERT INTO cs_committee_members (name, position, image, facebook, email, linkedin) VALUES
('Ahmed Ben Salem', 'Chair', '/placeholder.svg?height=300&width=300', 'https://facebook.com/ahmed.bensalem', 'ahmed@cs-isimm.org', 'https://linkedin.com/in/ahmed-bensalem'),
('Yasmine Trabelsi', 'Vice Chair', '/placeholder.svg?height=300&width=300', 'https://facebook.com/yasmine.trabelsi', 'yasmine@cs-isimm.org', 'https://linkedin.com/in/yasmine-trabelsi'),
('Mohamed Karray', 'Secretary', '/placeholder.svg?height=300&width=300', 'https://facebook.com/mohamed.karray', 'mohamed@cs-isimm.org', 'https://linkedin.com/in/mohamed-karray'),
('Sarra Bouaziz', 'Treasurer', '/placeholder.svg?height=300&width=300', 'https://facebook.com/sarra.bouaziz', 'sarra@cs-isimm.org', 'https://linkedin.com/in/sarra-bouaziz'),
('Karim Jebali', 'Technical Coordinator', '/placeholder.svg?height=300&width=300', 'https://facebook.com/karim.jebali', 'karim@cs-isimm.org', 'https://linkedin.com/in/karim-jebali'),
('Nour Hamdi', 'Public Relations', '/placeholder.svg?height=300&width=300', 'https://facebook.com/nour.hamdi', 'nour@cs-isimm.org', 'https://linkedin.com/in/nour-hamdi');

-- Insert sample CS events
INSERT INTO cs_events (title, description, date, location, attendees, images) VALUES
('AI & Machine Learning Workshop', 'A comprehensive workshop focusing on artificial intelligence and machine learning fundamentals.', '2024-03-15', 'ISIMM Campus', 85, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']),
('Competitive Programming Contest', 'Annual programming competition featuring algorithmic challenges and problem-solving.', '2024-02-28', 'Computer Lab A', 60, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']),
('Software Engineering Seminar', 'Professional development session covering modern software engineering practices and methodologies.', '2024-02-10', 'Main Auditorium', 95, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']);
