# IEEE ISIMM Student Branch Website

A modern, feature-rich website for the IEEE ISIMM Student Branch featuring dynamic event management, AI-powered chatbot assistant, interactive UI/UX elements, and comprehensive content showcasing 7 technical chapters and affinity groups.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

## ✨ Highlights

- 🎭 **Redesigned UI/UX**: Floating polaroid gallery, journey map timeline, dialogue-style testimonials
- 🤖 **AI Chatbot "Zarga"**: RAG-powered assistant with 30+ IEEE knowledge entries
- 📱 **Fully Responsive**: Mobile-first design with smooth animations and transitions
- 🎯 **7 Technical Chapters**: CS, CIS, WIE, IAS/PES, RAS, EMBS, SIGHT with dedicated pages
- 📧 **Contact Integration**: Forms send to sb-isimm@ieee.org with Google Maps location
- 🔐 **Secure Admin Panel**: JWT-authenticated dashboard for event management
- 🖼️ **Dynamic Events**: MongoDB-backed events with GridFS image storage

## 🚀 Features

### Core Features
- **Dynamic Event Management**: Admin dashboard for creating, managing, and deleting events with MongoDB persistence
- **Image Upload**: Support for multiple image uploads per event with GridFS storage
- **Modern UI/UX**: Redesigned pages with floating cards, polaroid galleries, journey maps, and dialogue-style layouts
- **Interactive Animations**: Scroll-triggered animations, hover effects, auto-scrolling carousels, and smooth transitions
- **Unified Recruitment**: All CTA buttons link to centralized Google recruitment form
- **Responsive Design**: Mobile-first approach with Tailwind CSS, optimized for all screen sizes
- **Contact Integration**: Forms send to official email (sb-isimm@ieee.org) with phone contact (+216 94 660 522)
- **Social Media Links**: Direct integration with Facebook, Instagram, LinkedIn, and chapter websites
- **Authentication**: Secure admin login with JWT tokens and bcrypt password hashing

### 🤖 AI Chatbot - "Zarga"
- **Knowledge-First Responses**: Answers questions using a local IEEE knowledge base (30+ entries)
- **LLM Integration**: Falls back to Google Gemini for complex queries
- **RAG-lite Architecture**: Retrieval-Augmented Generation for accurate answers
- **Floating Widget**: Accessible from any page via a floating chat button
- **Message History**: Persisted locally in browser storage
- **Markdown Support**: Rich formatted responses with source citations
- **Rate Limiting**: Built-in protection against API abuse

### 🎨 UI/UX Enhancements
- **Floating Polaroid Gallery**: 24 event photos with random rotations, staggered heights, and hover effects on About page
- **Journey Map Timeline**: Interactive milestone nodes with scroll-triggered animations and progress tracking
- **Floating Award Cards**: Dynamic picture cards with gradient overlays and zoom effects
- **Dialogue-Style Testimonials**: Speech bubble design alternating left/right for 6 former chairmen
- **Auto-Scrolling Executive Committee**: Horizontal carousel with hover-to-pause functionality
- **Coherent Design System**: Consistent color palette (sky blue & gray), typography, and spacing across all pages
- **Navigation Enhancements**: Clickable logos in header (home & IEEE Tunisia Section links)

### Pages
- **Home**: Hero section with embedded video, chapters & affinity groups showcase, IEEE community links, goals overview, executive committee auto-scroll, and recent events
- **About**: "WHO ARE WE" hero, mission & vision, core values, floating polaroid gallery (24 event photos with dynamic hover effects)
- **Events**: Dynamic events listing with lightbox gallery and social media integration
- **Committee**: Executive committee members with detailed profiles and social links
- **Subunits**: 7 technical chapters and affinity groups with reordered display and recruitment links
- **Awards**: Floating picture cards showcasing IEEE awards and achievements with hover effects
- **Timeline**: Interactive journey map UI with milestone nodes, scroll animations, and progress tracking
- **Testimonials**: Dialogue-style layout featuring 6 former chairmen with speech bubble design
- **Contact**: Contact form (sends to sb-isimm@ieee.org), Google Maps integration, and FAQ section
- **Admin Dashboard**: Secure event management interface with image upload

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15.2.4 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | MongoDB (Atlas) |
| **Authentication** | JWT + bcryptjs |
| **File Upload** | GridFS (MongoDB) |
| **UI Components** | shadcn/ui + Radix UI |
| **Icons** | Lucide React |
| **AI/LLM** | Google Gemini API |
| **Markdown** | react-markdown |

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database (local or Atlas)
- npm or pnpm package manager
- Google Gemini API key (for chatbot feature)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/WajdyB/ieee-isimm-sb-website.git
cd ieee-isimm-sb-website
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
# or
pnpm install
```

### 3. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Admin Authentication
ADMIN_EMAIL=admin@ieee-isimm.org
ADMIN_PASSWORD=your-secure-password

# JWT Secret (generate a strong secret for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# Chatbot / LLM Configuration
LLM_PROVIDER=GEMINI
LLM_API_KEY=your-google-gemini-api-key
LLM_MODEL=gemini-2.5-flash
```

### 4. Database Setup
Ensure MongoDB is running and accessible. The application will automatically create the necessary collections.

### 5. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
ieee-isimm-sb-website/
├── app/                       # Next.js App Router pages
│   ├── about/                 # About page
│   ├── admin/                 # Admin dashboard
│   ├── api/                   # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── chat/              # Chatbot API endpoint
│   │   ├── events/            # Event management endpoints
│   │   └── upload/            # File upload endpoint
│   ├── awards/                # Awards page
│   ├── committee/             # Executive committee page
│   ├── contact/               # Contact page
│   ├── events/                # Events listing page
│   ├── subunits/              # Subunits page
│   ├── testimonials/          # Testimonials page
│   ├── timeline/              # Timeline page
│   ├── layout.tsx             # Root layout with ChatWidget
│   └── page.tsx               # Home page
├── components/                # Reusable UI components
│   ├── chatbot/               # Chatbot components
│   │   └── ChatWidget.tsx     # Floating chat widget
│   ├── ui/                    # shadcn/ui components
│   ├── header.tsx             # Site header
│   └── footer.tsx             # Site footer
├── data/                      # Static data files
│   └── ieee_knowledge_tn.json # Chatbot knowledge base
├── lib/                       # Utility functions
│   ├── api.ts                 # Frontend API utilities
│   ├── auth.ts                # Authentication utilities
│   ├── kb-engine.ts           # Knowledge base search engine
│   ├── llm-provider.ts        # LLM provider adapter (Gemini)
│   ├── mongodb.ts             # MongoDB connection
│   └── utils.ts               # General utilities
├── public/                    # Static assets
│   ├── committee/             # Committee member photos
│   ├── gallery-about/         # About page gallery images (24 photos)
│   ├── logos/                 # Logo assets
│   └── ...                    # Other static files
├── types/                     # TypeScript type definitions
├── .env.example               # Environment variables template
├── env-example.txt            # Chatbot env template
├── CHATBOT_SETUP.md           # Chatbot setup guide
└── README.md                  # This file
```

## 🎯 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Admin login |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/events` | Get all events |
| `POST` | `/api/events` | Create new event (admin only) |
| `DELETE` | `/api/events/[id]` | Delete event (admin only) |

### File Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload` | Upload event images (admin only) |
| `GET` | `/api/upload/[id]` | Retrieve uploaded image |

### Chatbot
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send message to Zarga chatbot |

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "What is IEEE?" }
  ]
}
```

**Response:**
```json
{
  "reply": "IEEE (Institute of Electrical and Electronics Engineers) is...",
  "sources": [{ "title": "IEEE Overview", "links": [...] }],
  "meta": { "matches": 5, "usedKB": true }
}
```

## 🤖 Chatbot Setup (Zarga)

The chatbot feature requires a Google Gemini API key.

### Quick Setup
1. Get an API key from [Google AI Studio](https://aistudio.google.com/)
2. Add to your `.env` file:
   ```env
   LLM_PROVIDER=GEMINI
   LLM_API_KEY=your-api-key-here
   LLM_MODEL=gemini-2.5-flash
   ```
3. Restart the dev server

### Knowledge Base
The chatbot uses a local knowledge base located at `data/ieee_knowledge_tn.json`. It contains:
- IEEE global information
- IEEE Tunisia Section details
- IEEE ISIMM Student Branch specifics
- Membership information
- Event types and activities

To add more entries, edit the JSON file following the existing structure.

### Architecture
```
User Query → Rate Limiter → KB Search → LLM (Gemini) → Response
                              ↓
                    Inject KB context into prompt
```

## 🎨 Customization

### Design Philosophy
The website follows a **modern, professional IEEE aesthetic** with:
- **Primary Color**: Sky blue (`#0ea5e9`) for IEEE branding
- **Secondary Colors**: Gray tones for balance and coherence
- **Typography**: Clear, readable fonts with consistent sizing
- **Spacing**: Generous padding and margins for breathability
- **Animations**: Subtle, purposeful transitions that enhance UX

### Colors
The website uses IEEE sky blue (`#0ea5e9`) as the primary color with gray accents. Customize in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - CSS custom properties and animation keyframes

### Content
- **Events**: Manage through admin dashboard at `/admin`
- **Committee Members**: Edit `executiveMembers` array in `app/page.tsx` and detailed profiles in `app/committee/page.tsx`
- **Subunits**: Edit `subunitData` array in `app/page.tsx` and detailed info in `app/subunits/page.tsx`
- **Timeline Milestones**: Edit `milestones` array in `app/timeline/page.tsx`
- **Awards**: Edit `awards` array in `app/awards/page.tsx`
- **Testimonials**: Edit `testimonials` array in `app/testimonials/page.tsx`
- **Knowledge Base**: Edit `data/ieee_knowledge_tn.json` for chatbot responses
- **Gallery Images**: Place event photos in `public/gallery-about/` directory
- **Contact Info**: Update in `components/footer.tsx`, `app/contact/page.tsx` (currently: sb-isimm@ieee.org, +216 94 660 522)
- **Recruitment Form**: Update Google Form link across all CTA buttons

### Admin Dashboard
Access at `/admin` to:
- Create new events with images
- Delete existing events
- View all events in a list

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

**Vercel Configuration:**
- ✅ Function Duration: 30 seconds for upload endpoints
- ✅ CORS Headers: Properly configured
- ✅ Payload Limits: Optimized for image uploads
- ✅ Error Handling: Robust error responses

### Other Platforms
Compatible with any Next.js hosting:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Considerations

### Production Checklist
- [ ] Change default admin credentials
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set up proper MongoDB authentication
- [ ] Configure CORS if needed
- [ ] Set up image optimization
- [ ] Enable rate limiting (built-in for chatbot)
- [ ] Secure LLM API key

### Environment Variables for Production
```env
MONGODB_URI=your-production-mongodb-uri
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-secret
LLM_PROVIDER=GEMINI
LLM_API_KEY=your-gemini-api-key
LLM_MODEL=gemini-2.5-flash
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- **Email**: sb-isimm@ieee.org
- **Phone**: +216 94 660 522
- **GitHub**: Create an issue in the repository
- **Website**: Use the contact form at `/contact`
- **Chatbot Help**: Check [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) for chatbot-specific setup

### Official Links
- **Facebook**: [IEEE ISIMM SB](https://www.facebook.com/IEEEISIMMSB)
- **IEEE Tunisia Section**: [ieee.tn](https://www.ieee.tn)
- **Location**: ISIMM Campus, Monastir, Tunisia

---

**Built with ❤️ for IEEE ISIMM Student Branch**

*Advancing Technology for Humanity* 🌍