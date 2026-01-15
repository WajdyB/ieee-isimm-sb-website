# IEEE ISIMM Student Branch Website

A modern, responsive website for the IEEE ISIMM Student Branch with dynamic event management, AI-powered chatbot assistant, and comprehensive content management capabilities.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

## 🚀 Features

### Core Features
- **Dynamic Event Management**: Admin dashboard for creating, managing, and deleting events
- **Image Upload**: Support for multiple image uploads per event with GridFS storage
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas
- **Authentication**: Secure admin login with JWT tokens
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Beautiful, accessible interface with smooth animations

### 🤖 AI Chatbot - "Zarga"
- **Knowledge-First Responses**: Answers questions using a local IEEE knowledge base (30+ entries)
- **LLM Integration**: Falls back to Google Gemini for complex queries
- **RAG-lite Architecture**: Retrieval-Augmented Generation for accurate answers
- **Floating Widget**: Accessible from any page via a floating chat button
- **Message History**: Persisted locally in browser storage
- **Markdown Support**: Rich formatted responses with source citations
- **Rate Limiting**: Built-in protection against API abuse

### Pages
- **Home**: Hero section, chapters overview, gallery, goals, executive committee, recent events
- **About**: Mission, vision, values, photo gallery
- **Events**: Dynamic events listing with lightbox gallery
- **Committee**: Executive committee members with social links
- **Subunits**: Technical chapters and affinity groups
- **Awards**: IEEE awards and recognition
- **Timeline**: Historical milestones and achievements
- **Testimonials**: Former chairs' experiences
- **Contact**: Contact form with Google Maps integration
- **Admin Dashboard**: Event management interface

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
│   ├── gallery-home/          # Homepage gallery images
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

### Colors
The website uses IEEE sky blue (`#0ea5e9`) as the primary color. Customize in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - CSS custom properties

### Content
- **Events**: Manage through admin dashboard
- **Committee Members**: Edit `app/page.tsx` and `app/committee/page.tsx`
- **Knowledge Base**: Edit `data/ieee_knowledge_tn.json`
- **Static Content**: Edit directly in respective page files
- **Images**: Place in `public/` directory

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
- Create an issue in the repository
- Contact the IEEE ISIMM SB development team
- Check the [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) for chatbot-specific help

---

**Built with ❤️ for IEEE ISIMM Student Branch**

*Advancing Technology for Humanity* 🌍