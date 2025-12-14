# Backend Implementation with Laravel

## Phase 1: Laravel Project Setup
- [ ] Create new Laravel project in 'backend' subdirectory
- [ ] Install Laravel Sanctum for authentication
- [ ] Configure database connection (.env file)
- [ ] Set up CORS configuration

## Phase 2: Database Models and Migrations
- [ ] Create User model and migration (for authentication)
- [ ] Create Faculty model and migration
- [ ] Create Announcement model and migration
- [ ] Create Event model and migration
- [ ] Create CalendarItem model and migration
- [ ] Run migrations

## Phase 3: API Controllers and Routes
- [ ] Create AuthController for login/logout
- [ ] Create FacultyController with CRUD operations
- [ ] Create AnnouncementController with CRUD operations
- [ ] Create EventController with CRUD operations
- [ ] Create CalendarController with CRUD operations
- [ ] Set up API routes with proper middleware

## Phase 4: Seed Initial Data
- [ ] Create database seeders for initial faculty data
- [ ] Create seeders for sample announcements, events, calendar items
- [ ] Run seeders

## Phase 5: Frontend Integration
- [x] Update FacultyContext to use API calls instead of localStorage
- [x] Update AnnouncementContext to use API calls
- [x] Update EventContext to use API calls
- [x] Update CalendarContext to use API calls
- [x] Update login components to authenticate via API
- [x] Install axios for HTTP requests in frontend

## Phase 6: Testing and Finalization
- [ ] Test all API endpoints
- [ ] Test frontend-backend integration
- [ ] Update any remaining hardcoded data
- [ ] Final testing and bug fixes
