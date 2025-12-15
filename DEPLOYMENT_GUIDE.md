# Backend Deployment Guide

## Option 1: Render (Recommended)

### Prerequisites
- GitHub/GitLab repository with your code
- Render account (free tier available)

### Steps
1. **Push code to repository:**
   ```bash
   git add .
   git commit -m "Ready for backend deployment"
   git push origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub/GitLab repository
   - Select the `backend` folder as root directory
   - Render will detect your `render.yaml` automatically

3. **Environment Variables:**
   Render will automatically set up the MySQL database and configure the environment variables from your `render.yaml`.

### Your Configured Services
- **Backend API**: `sorsu-api` → `https://sorsu-api.onrender.com`
- **Database**: MySQL (free tier)
- **Frontend**: Already deployed on Netlify

## Option 2: Heroku

### Add Procfile (already created)
The `Procfile` is already in your backend folder.

### Deployment Commands
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Set environment variables
heroku config:set APP_ENV=production
heroku config:set APP_DEBUG=false
heroku config:set APP_KEY=$(php artisan key:generate --show)

# Deploy
git push heroku main
```

## Option 3: DigitalOcean App Platform

1. Create `app.yaml` in backend root
2. Follow DigitalOcean deployment guide
3. Connect database

## Post-Deployment Steps

### 1. Update Frontend API URL
Update your frontend environment to point to the deployed backend:
```env
VITE_API_BASE_URL=https://sorsu-api.onrender.com/api
```

### 2. Test the Connection
- Check API endpoints are accessible
- Verify database connectivity
- Test authentication flows

### 3. SSL Certificate
All platforms provide free SSL certificates automatically.

## Environment Variables Needed
- `APP_KEY` (generate with `php artisan key:generate`)
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `APP_ENV=production`
- `APP_DEBUG=false`

## Troubleshooting
- Check logs on deployment platform
- Verify database connection
- Ensure `storage` directory is writable
- Check CORS settings if frontend can't connect

## Recommended Choice
**Render** is recommended because:
- Your `render.yaml` is already configured
- Free MySQL database included
- Easy GitHub integration
- Good Laravel support
