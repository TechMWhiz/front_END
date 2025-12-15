#!/bin/bash

# Production deployment script for Render
echo "Starting Laravel deployment..."

# Install dependencies
composer install --no-dev --optimize-autoloader

# Cache configuration for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run database migrations
php artisan migrate --force

# Start the application
php artisan serve --host=0.0.0.0 --port=$PORT
