# Transcendence - Advanced 3D Pong Game Platform

A modern, full-stack web application featuring an advanced 3D Pong game with multiplayer capabilities, tournaments, AI opponents, and comprehensive user management. Built with cutting-edge web technologies and stunning 3D graphics.

## 🎮 Features

### Core Gameplay
- **3D Pong Experience**: Immersive 3D gameplay powered by Babylon.js WebGL engine
- **Multiple Game Modes**:
  - Classic 2-player mode
  - AI opponents with multiple difficulty levels (Easy, Medium, Hard)
  - Multiplayer mode with dynamic center paddle
  - Tournament system with bracket-style competitions
- **Advanced Physics**: Realistic ball physics with velocity increases and collision detection
- **Visual Effects**: Particle systems, glow effects, dynamic lighting, and color transitions
- **Real-time Scoring**: Live score tracking with visual feedback

### User Management
- **Secure Authentication**: JWT-based authentication with refresh tokens
- **Multi-Provider OAuth**: Support for Google, GitHub, Microsoft, and Discord login
- **Two-Factor Authentication (2FA)**: TOTP-based security with backup codes
- **User Profiles**: Customizable avatars, display names, and user statistics
- **Friend System**: Add friends, view profiles, and track relationships

### Tournament System
- **Bracket Tournaments**: Organized tournament play with multiple participants
- **Match History**: Complete game history with statistics and performance tracking
- **Real-time Updates**: Live tournament progression and results

### Administrative Features
- **Admin Dashboard**: User management and system administration
- **OAuth Management**: Advanced OAuth provider configuration and monitoring
- **System Analytics**: Comprehensive logging and analytics for all user activities

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15 with TypeScript
- **3D Engine**: Babylon.js for WebGL-based 3D graphics
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context API
- **Authentication**: JWT token management with automatic refresh

### Backend
- **Framework**: Fastify (Node.js) for high-performance API
- **Database**: SQLite with better-sqlite3 for data persistence
- **Authentication**: JWT with bcrypt password hashing
- **OAuth**: Multi-provider OAuth2 integration
- **Security**: Rate limiting, CORS, helmet for security headers
- **File Handling**: Multipart file uploads for avatars

### Infrastructure
- **Containerization**: Docker and Docker Compose for easy deployment
- **Reverse Proxy**: Nginx for frontend serving
- **Development**: Hot reload and development server setup

## 🏗 Project Structure

```
transcendence/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # Reusable React components
│   │   ├── game/            # 3D game engine and logic
│   │   │   ├── components/  # Game-specific components
│   │   │   ├── modes/       # Different game modes
│   │   │   ├── utils/       # Game utilities and physics
│   │   │   └── factories/   # Factory patterns for game objects
│   │   └── lib_front/       # Frontend utilities and context
│   └── Dockerfile           # Frontend container configuration
├── backend/                 # Fastify backend API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Authentication and validation
│   │   ├── utils/           # Utilities (JWT, OAuth, 2FA)
│   │   └── db.js            # Database configuration
│   └── Dockerfile           # Backend container configuration
└── docker-compose.yml       # Multi-container orchestration
```

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Modern web browser with WebGL support

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd transcendence
   ```

2. **Set up environment variables**
   ```bash
   # Backend environment
   cp backend/.env.example backend/.env
   # Configure your OAuth providers and secrets
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000

### Local Development Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
# Database
DATABASE_PATH=./data/database.sqlite

# JWT Configuration
JWT_SECRET=your-secret-key-here
BCRYPT_ROUNDS=12

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret

# URLs
FRONTEND_URL=http://localhost:8080
BACKEND_URL=http://localhost:3000
```

### OAuth Setup
Configure OAuth applications with your providers:
- **Google**: Google Cloud Console
- **GitHub**: GitHub Developer Settings
- **Microsoft**: Azure App Registration
- **Discord**: Discord Developer Portal

## 🎯 Game Features

### 3D Graphics & Effects
- **Babylon.js Engine**: Advanced 3D rendering with WebGL
- **Particle Systems**: Ball trails, impact effects, and environmental particles
- **Dynamic Lighting**: Glow effects and emissive materials
- **Smooth Animations**: Eased animations for paddle movements and transitions
- **Visual Feedback**: Color-coded elements and real-time visual responses

### AI System
- **Multiple Difficulty Levels**: Configurable AI opponents
- **Smart Prediction**: AI predicts ball trajectories for realistic gameplay
- **Adaptive Behavior**: AI adjusts to game state and player performance

### Multiplayer Features
- **Real-time Gameplay**: Synchronous multiplayer experience
- **Center Paddle Mode**: Unique multiplayer variant with dynamic obstacles
- **Tournament Brackets**: Organized competitive play

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Security**: Bcrypt hashing with configurable rounds
- **Two-Factor Authentication**: TOTP implementation with backup codes
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Joi schema validation for all inputs
- **CORS Protection**: Configured cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers

## 🚀 Deployment

### Docker Production Deployment
```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f
```

### Manual Deployment
1. Build frontend: `npm run build`
2. Start backend: `npm start`
3. Configure reverse proxy (Nginx/Apache)
4. Set up SSL certificates
5. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Documentation

The backend provides a RESTful API with the following main endpoints:
- `/api/auth/*` - Authentication and user management
- `/api/users/*` - User profiles and relationships
- `/api/games/*` - Game management and history
- `/api/tournaments/*` - Tournament system
- `/api/2fa/*` - Two-factor authentication
- `/api/oauth/*` - OAuth provider management

## 🏆 Game Statistics

The platform tracks comprehensive game statistics:
- Games played and win/loss ratios
- Tournament participation and victories
- Performance metrics and achievements
- Friend relationships and social features

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- WebGL 2.0 support required

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎮 Screenshots & Demo

Experience the future of Pong with:
- Stunning 3D graphics and smooth gameplay
- Competitive tournaments and social features
- Advanced AI opponents and multiplayer modes
- Modern web technologies and responsive design

---

*Built with ❤️ using modern web technologies for an exceptional gaming experience.*
