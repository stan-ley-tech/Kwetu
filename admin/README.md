# Kwetu Place Admin Dashboard

## Overview
Professional admin dashboard for managing Kwetu Place bookings, services, and customer relationships.

## Features

### 🔐 Authentication
- Secure login system using Supabase Auth
- Session management and automatic logout
- Protected routes for admin access only

### 📊 Dashboard Analytics
- **Real-time Statistics**: Total bookings, revenue, and performance metrics
- **Booking Status Tracking**: Pending, confirmed, cancelled, and completed bookings
- **Revenue Analytics**: Monthly performance and service profitability
- **Top Services**: Best-performing services by revenue and bookings

### 📅 Booking Management
- **Complete Booking View**: All customer bookings in one interface
- **Status Updates**: Confirm, complete, or cancel bookings with one click
- **Customer Information**: Full customer details and contact information
- **Service Analytics**: Performance metrics per service type

### 🎛️ Service Management
- **Service Catalog**: Manage all services across all categories
- **Pricing Control**: Update service prices and descriptions
- **Availability Control**: Enable/disable services as needed
- **Category Organization**: Organize services by type (Barber, Car Wash, Events, etc.)

### 👥 Customer Relationship Management (CRM)
- **Customer Database**: Complete customer profiles and history
- **Booking History**: Track all past and current bookings
- **Loyalty Tracking**: Monitor customer loyalty and repeat business
- **Communication Tools**: Integrated messaging and notification system

### ⚙️ System Settings
- **Business Information**: Update company details and contact information
- **Notification Settings**: Configure email and SMS notifications
- **Payment Settings**: Manage payment methods and processing
- **User Management**: Add/remove admin users and permissions

## Technical Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Font Awesome**: Professional icons

### Backend & Database
- **Supabase**: PostgreSQL database with real-time subscriptions
- **Authentication**: Secure user management and session handling
- **Row Level Security**: Granular access control
- **Real-time Updates**: Live booking status updates

## Installation & Setup

### 1. Environment Configuration
```bash
# Copy .env.local.example to .env.local
cp .env.local.example .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup
1. Create a new Supabase project
2. Run the SQL commands from `.env.local` in Supabase SQL Editor
3. Enable Row Level Security policies
4. Create admin user in Supabase Auth

### 3. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 4. Run Development Server
```bash
npm run dev
```

Access the admin dashboard at: `http://localhost:3000/admin`

## Database Schema

### Bookings Table
```sql
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Services Table
```sql
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  duration INTEGER, -- in minutes
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Customers Table
```sql
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  total_bookings INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0.00,
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Security Features

### Authentication
- Password-based login with secure session management
- Automatic session timeout and logout
- Protected admin routes with authentication checks

### Data Protection
- Row Level Security (RLS) policies on all tables
- Input validation and sanitization
- SQL injection prevention through parameterized queries
- XSS protection with proper data escaping

### Access Control
- Role-based access control
- Granular permissions for different admin functions
- Audit logging for all admin actions
- Secure API endpoints with authentication middleware

## API Integration

### Booking System Integration
- Real-time booking status updates
- Automatic email/SMS notifications
- Customer confirmation and reminder systems
- Integration with existing booking forms

### Payment Processing
- M-Pesa STK Push integration ready
- Secure payment handling
- Transaction logging and reconciliation
- Refund and cancellation processing

### Customer Communication
- Automated booking confirmations
- Reminder notifications (24 hours before)
- Status update notifications
- Marketing and promotional messaging

## Performance Features

### Real-time Updates
- Live booking status tracking
- Real-time revenue calculations
- Instant dashboard updates
- WebSocket connections for live data

### Analytics & Reporting
- Revenue analytics by service and time period
- Customer behavior tracking
- Service performance metrics
- Export functionality for reports

### Mobile Responsiveness
- Fully responsive design for all screen sizes
- Touch-friendly interface elements
- Optimized for mobile data usage
- Progressive Web App (PWA) ready

## Deployment

### Production Setup
1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy to Vercel/Netlify/Your hosting provider
4. Configure domain and SSL certificates
5. Set up monitoring and analytics

### Environment Variables
```bash
# Production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key

# Development
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_development_anon_key
```

## Support & Maintenance

### Monitoring
- Error tracking and logging
- Performance monitoring
- Database query optimization
- Regular security updates

### Backup Strategy
- Automated daily database backups
- Point-in-time recovery capability
- Geographic redundancy for disaster recovery
- Data export capabilities

## Future Enhancements

### Phase 2 Features
- [ ] Advanced analytics with custom date ranges
- [ ] Multi-location support
- [ ] Staff scheduling and management
- [ ] Inventory management system
- [ ] Advanced reporting with charts

### Phase 3 Features
- [ ] Mobile admin app
- [ ] API for third-party integrations
- [ ] Advanced customer segmentation
- [ ] AI-powered insights and recommendations
- [ ] Multi-language support

## Support

For technical support or questions about the admin dashboard:
- Email: tech@kwetuplace.com
- Phone: +254 123 456 789
- Documentation: Available in project repository

---
**Kwetu Place Admin Dashboard** - Professional management system for modern lifestyle destinations.
