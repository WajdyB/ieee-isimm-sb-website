-- Create events table for IEEE ISIMM Student Branch
CREATE TABLE IF NOT EXISTS ieee_events (
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

-- Create committee_members table for IEEE ISIMM Student Branch
CREATE TABLE IF NOT EXISTS ieee_committee_members (
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
CREATE TABLE IF NOT EXISTS ieee_admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample IEEE ISIMM committee members
INSERT INTO ieee_committee_members (name, position, image, facebook, email, linkedin) VALUES
('Omar Benali', 'Chair', '/placeholder.svg?height=300&width=300', 'https://facebook.com/omar.benali', 'omar@ieee-isimm.org', 'https://linkedin.com/in/omar-benali'),
('Salma Khediri', 'Vice Chair', '/placeholder.svg?height=300&width=300', 'https://facebook.com/salma.khediri', 'salma@ieee-isimm.org', 'https://linkedin.com/in/salma-khediri'),
('Youssef Mejri', 'Secretary', '/placeholder.svg?height=300&width=300', 'https://facebook.com/youssef.mejri', 'youssef@ieee-isimm.org', 'https://linkedin.com/in/youssef-mejri'),
('Ines Gharbi', 'Treasurer', '/placeholder.svg?height=300&width=300', 'https://facebook.com/ines.gharbi', 'ines@ieee-isimm.org', 'https://linkedin.com/in/ines-gharbi'),
('Mehdi Sassi', 'Events Coordinator', '/placeholder.svg?height=300&width=300', 'https://facebook.com/mehdi.sassi', 'mehdi@ieee-isimm.org', 'https://linkedin.com/in/mehdi-sassi'),
('Rim Bouslama', 'Public Relations', '/placeholder.svg?height=300&width=300', 'https://facebook.com/rim.bouslama', 'rim@ieee-isimm.org', 'https://linkedin.com/in/rim-bouslama');

-- Insert sample IEEE ISIMM events
INSERT INTO ieee_events (title, description, date, location, attendees, images) VALUES
('Engineering Innovation Summit', 'Annual summit bringing together students, faculty, and industry professionals to showcase innovations.', '2024-03-15', 'ISIMM Campus', 200, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']),
('Technical Workshop Series', 'Hands-on workshops covering emerging technologies and engineering practices.', '2024-02-28', 'Engineering Labs', 75, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']),
('Student Research Symposium', 'Platform for students to present their research projects and innovations to the community.', '2024-02-10', 'Main Auditorium', 150, ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']);
