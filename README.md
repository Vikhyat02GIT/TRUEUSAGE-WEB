# True Usage - Electricity Usage Tracking App

A modern web application for tracking and managing electricity usage. Built with Next.js, React, and TypeScript.

## Features

- 📊 Real-time usage tracking and visualization
- 👥 Family member management
- 💰 Bill tracking and payment
- 🌙 Dark mode support
- 📱 Responsive design
- 🔒 Secure authentication
- 📈 Usage insights and analytics

## Tech Stack

- **Frontend Framework**: Next.js 15
- **Language**: TypeScript
- **UI Components**: 
  - Radix UI
  - Tailwind CSS
  - Lucide React Icons
- **Authentication**: NextAuth.js
- **Database**: Prisma
- **Charts**: Chart.js
- **Form Handling**: React Hook Form + Zod

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Vikhyat02GIT/TRUEUSAGE-WEB.git
cd TRUEUSAGE-WEB
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```env
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── api/           # API routes
├── dashboard/     # Dashboard page
├── login/         # Login page
├── family-members/# Family members page
├── settings/      # Settings page
├── providers/     # Context providers
└── utils/         # Utility functions
```

## Features in Detail

### Dashboard
- Real-time usage monitoring
- Usage trends and analytics
- Quick actions for common tasks
- Usage insights and recommendations

### Family Members
- Add and manage family members
- Assign roles and permissions
- Track individual usage

### Settings
- Profile management
- Notification preferences
- Security settings
- Theme customization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Vikhyat Baliyan - [@Vikhyat02GIT](https://github.com/Vikhyat02GIT)

Project Link: [https://github.com/Vikhyat02GIT/TRUEUSAGE-WEB](https://github.com/Vikhyat02GIT/TRUEUSAGE-WEB) 