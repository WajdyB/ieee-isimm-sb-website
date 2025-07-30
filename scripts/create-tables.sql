-- Create events table
CREATE TABLE IF NOT EXISTS events (
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

-- Create committee_members table
CREATE TABLE IF NOT EXISTS committee_members (
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
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample committee members
INSERT INTO committee_members (name, position, image, facebook, email, linkedin) VALUES
('Sarah Johnson', 'Chair', '/placeholder.svg?height=300&width=300', 'https://facebook.com/sarah.johnson', 'sarah@wie-isimm.org', 'https://linkedin.com/in/sarah-johnson'),
('Amira Ben Ali', 'Vice Chair', '/placeholder.svg?height=300&width=300', 'https://facebook.com/amira.benali', 'amira@wie-isimm.org', 'https://linkedin.com/in/amira-benali'),
('Emily Chen', 'Secretary', '/placeholder.svg?height=300&width=300', 'https://facebook.com/emily.chen', 'emily@wie-isimm.org', 'https://linkedin.com/in/emily-chen'),
('Fatma Gharbi', 'Treasurer', '/placeholder.svg?height=300&width=300', 'https://facebook.com/fatma.gharbi', 'fatma@wie-isimm.org', 'https://linkedin.com/in/fatma-gharbi'),
('Maria Rodriguez', 'Events Coordinator', '/placeholder.svg?height=300&width=300', 'https://facebook.com/maria.rodriguez', 'maria@wie-isimm.org', 'https://linkedin.com/in/maria-rodriguez'),
('Leila Mansouri', 'Public Relations', '/placeholder.svg?height=300&width=300', 'https://facebook.com/leila.mansouri', 'leila@wie-isimm.org', 'https://linkedin.com/in/leila-mansouri');

-- Insert sample events
INSERT INTO events (title, description, date, location, attendees, images) VALUES
('Women in Tech Leadership Summit', 'A comprehensive summit focusing on leadership development for women in technology fields.', '2024-03-15', 'ISIMM Campus', 120, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']),
('Coding Workshop for Beginners', 'An introductory workshop designed to teach basic programming concepts to newcomers.', '2024-02-28', 'Computer Lab A', 45, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']),
('Career Development Seminar', 'Professional development session covering resume building, interview skills, and career planning.', '2024-02-10', 'Main Auditorium', 80, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']);
