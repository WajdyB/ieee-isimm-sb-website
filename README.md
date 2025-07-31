# IEEE ISIMM Student Branch Website

A modern, responsive website for the IEEE ISIMM Student Branch with dynamic event management capabilities.

## 🚀 Features

### Core Features
- **Dynamic Event Management**: Admin dashboard for creating, managing, and deleting events
- **Image Upload**: Support for multiple image uploads per event
- **MongoDB Integration**: Persistent data storage with MongoDB
- **Authentication**: Secure admin login with JWT tokens
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Beautiful, accessible interface with smooth animations

### Pages
- **Home**: Hero section, chapters overview, gallery, goals, executive committee, recent events
- **About**: Mission, vision, values, photo gallery
- **Events**: Dynamic events listing with lightbox gallery
- **Subunits**: Technical chapters and affinity groups
- **Timeline**: Historical milestones and achievements
- **Testimonials**: Former chairs' experiences
- **Contact**: Contact form with Google Maps integration
- **Admin Dashboard**: Event management interface

## 🛠️ Technology Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database
- npm or pnpm package manager

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ieee-isimm-sb-website
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=

# Admin Authentication
ADMIN_EMAIL=
ADMIN_PASSWORD=

# JWT Secret (generate a strong secret for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
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


### Admin Dashboard
Access the admin dashboard at `/admin` to:
- Create new events with images
- Delete existing events
- View all events in a list

## 📁 Project Structure

```
ieee-isimm-sb-website/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── events/        # Event management endpoints
│   │   └── upload/        # File upload endpoint (simple & robust)
│   └── ...                # Other pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions
│   ├── mongodb.ts         # MongoDB connection
│   └── auth.ts            # Authentication utilities
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── ...
```

**Clean Codebase:**
- ✅ **Simplified structure** - Only necessary files remain
- ✅ **Clear API endpoints** - `/api/upload` and `/api/events`
- ✅ **No confusion** - Removed all alternative approaches
- ✅ **Easy maintenance** - Minimal codebase to maintain
- ✅ **Reliable uploads** - GridFS storage with 10MB per file limit

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event (admin only)
- `DELETE /api/events/[id]` - Delete event (admin only)

### File Upload
- `POST /api/upload` - Upload event images (admin only)

**Image Upload Solution:**
- **GridFS Storage**: Images stored efficiently in MongoDB GridFS
- **High Performance**: No base64 conversion, direct file storage
- **Reliable**: Handles multiple image formats (JPEG, JPG, PNG, GIF, WebP)
- **Scalable**: 10MB per file limit with efficient streaming
- **Secure**: Proper file validation and authentication

## 🎨 Customization

### Colors
The website uses a sky blue (`#0ea5e9`) as the primary color, matching IEEE branding. You can customize colors in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - CSS custom properties

### Content
- **Events**: Manage through admin dashboard
- **Static Content**: Edit directly in the respective page files
- **Images**: Upload through admin dashboard or place in `public/` directory

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

**Vercel Configuration:**
- ✅ **Function Duration**: 30 seconds for upload endpoints
- ✅ **CORS Headers**: Properly configured for all API routes
- ✅ **Payload Limits**: Optimized for image uploads
- ✅ **Error Handling**: Robust error responses

### Other Platforms
The application can be deployed to any platform that supports Next.js:
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
- [ ] Enable rate limiting

### Environment Variables for Production
```env
MONGODB_URI=
ADMIN_EMAIL=
ADMIN_PASSWORD=
JWT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for IEEE ISIMM Student Branch** 