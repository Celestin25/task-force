# Personal Wallet Management System

A comprehensive web application for tracking personal finances across multiple accounts, built with Next.js, React, and Vue.js.

## Project Links

- [Backend Repository](https://github.com/yourusername/wallet-backend)
- [React Frontend Repository](https://github.com/yourusername/wallet-frontend-react)
- [Vue Frontend Repository](https://github.com/yourusername/wallet-frontend-vue)
- [Live Demo (React)](https://wallet-react.vercel.app)
- [Live Demo (Vue)](https://wallet-vue.vercel.app)
- [API Documentation](https://wallet-api.vercel.app/api-docs)

## Features

- **Multi-Account Transaction Tracking**
 - Track transactions across bank accounts, mobile money, and cash
 - Record both income and expenses
 - Real-time balance updates

- **Budget Management**
 - Set budget limits with customizable thresholds
 - Receive notifications when exceeding budgets
 - Monthly and category-wise budget tracking

- **Expense Categorization**
 - Create custom categories and subcategories
 - Tag transactions with relevant categories
 - Hierarchical category management

- **Reporting & Analytics**
 - Generate detailed transaction reports
 - Filter by custom date ranges
 - Export reports in various formats

- **Data Visualization**
 - Interactive charts and graphs
 - Expense distribution visualization
 - Income vs. Expense trends

## Tech Stack

### Backend (Next.js)
- Node.js & Next.js API Routes
- MongoDB for database
- JWT Authentication
- RESTful API design
- Swagger API documentation

### Frontend (React & Vue)
- React/Vue for UI
- Redux/Vuex for state management
- Tailwind CSS for styling
- Chart.js for visualizations
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
```bash
# Clone repository
git clone https://github.com/yourusername/wallet-backend
cd wallet-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
