# SorSU-Bulan System Backup Guide

## Overview
This guide provides comprehensive instructions for backing up and restoring the entire SorSU-Bulan university management system.

## System Components
- **Frontend**: React/Vite application (`src/` directory)
- **Backend**: Laravel API (`backend/` directory)
- **Database**: SQLite database (`backend/database/database.sqlite`)
- **Assets**: Images, documents, and media files

## Backup Methods

### 1. Git Repository Backup (Recommended)
```bash
# Create a complete git backup
git add .
git commit -m "System backup - $(date)"
git tag -a "backup-$(date +%Y%m%d-%H%M%S)" -m "System backup"
git push origin main --tags
```

### 2. Manual File Backup
```bash
# Create compressed backup
tar -czf sorsu-system-backup-$(date +%Y%m%d-%H%M%S).tar.gz \
  src/ \
  backend/ \
  build/ \
  package.json \
  package-lock.json \
  tsconfig.json \
  vite.config.ts \
  README.md \
  .gitignore
```

### 3. Database Backup
```bash
# Backup SQLite database
cp backend/database/database.sqlite backend/database/database.sqlite.backup.$(date +%Y%m%d)
```

## Frontend Backup

### Required Files
- `src/` - All React components and source code
- `package.json` - Dependencies and scripts
- `package-lock.json` - Locked dependency versions
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `build/` - Built assets (if exists)

### Key Components to Document
- **Authentication**: UnifiedLogin.tsx, auth context
- **Faculty Management**: FacultyDashboard.tsx, FacultyManager.tsx, FacultyContext.tsx
- **Announcements**: AnnouncementSection.tsx, AnnouncementManager.tsx
- **Events**: EventContext.tsx, event components
- **UI Components**: All components in `src/components/ui/`

## Backend Backup

### Required Files
- `backend/app/` - Laravel application code
- `backend/config/` - Configuration files
- `backend/database/` - Database files and migrations
- `backend/routes/` - API routes
- `backend/composer.json` - PHP dependencies
- `backend/.env` - Environment variables (IMPORTANT: exclude sensitive data)

### Key Backend Components
- **Controllers**: FacultyController, AuthController, etc.
- **Models**: Faculty, User, Announcement, Event models
- **Middleware**: Authentication, CORS
- **API Routes**: All API endpoints

## Database Schema Documentation

### Faculty Table Structure
```sql
-- Main faculty information
- id (string, primary key)
- first_name (string)
- last_name (string)
- email (string, unique)
- phone (string)
- office (string)
- department (string)
- title (string)
- status (enum: Active, On Leave, Sabbatical, Retired)
- bio (text)
- specializations (json)
- education (json)
- awards (json)
- profile_image (string, nullable)
- office_hours (string)
- website (string, nullable)
- research_interests (json)
- years_of_experience (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

### Users Table Structure
```sql
-- Authentication and user management
- id (integer, primary key)
- email (string, unique)
- password (hashed)
- role (enum: admin, faculty)
- name (string)
- created_at (timestamp)
- updated_at (timestamp)
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### Backend (.env)
```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
APP_NAME=SorSU-Bulan
APP_ENV=local
APP_KEY=base64:your-app-key
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
```

## Deployment Instructions

### Prerequisites
- Node.js (v16+)
- PHP (v8+)
- Composer
- SQLite3

### Frontend Deployment
```bash
# Install dependencies
npm install

# Build for production
npm run build

# The build/ directory contains the production files
```

### Backend Deployment
```bash
# Install PHP dependencies
cd backend
composer install

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Start Laravel server
php artisan serve
```

### Full System Deployment
```bash
# 1. Setup backend
cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan serve --port=8000 &

# 2. Setup frontend (in new terminal)
cd ..
npm install
npm run dev
```

## Restoration Process

### 1. Restore from Git
```bash
git clone <repository-url>
cd sorsu
git checkout <backup-tag>
```

### 2. Restore from Archive
```bash
tar -xzf sorsu-system-backup-YYYYMMDD-HHMMSS.tar.gz
```

### 3. Restore Database
```bash
cd backend
cp database/database.sqlite.backup.YYYYMMDD database/database.sqlite
```

### 4. Reinstall Dependencies
```bash
# Frontend
npm install

# Backend
cd backend
composer install
php artisan key:generate
```

## Regular Maintenance

### Weekly Tasks
- Commit changes to git
- Backup database
- Update dependencies
- Check for security updates

### Monthly Tasks
- Full system backup
- Documentation review
- Performance optimization
- Security audit

## Important Notes

1. **Never commit sensitive data** like API keys or passwords
2. **Always test backups** by attempting restoration
3. **Document any custom configurations** outside of standard files
4. **Keep multiple backup versions** in different locations
5. **Monitor storage space** for backup files

## Contact Information

For technical support or questions about the backup process:
- System Administrator
- Development Team

---

*Last Updated: $(date)*
*Version: 1.0*
