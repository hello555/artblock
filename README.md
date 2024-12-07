## Artblock

Artblock is a modern, interactive web application designed for showcasing and sharing art. Built using Next.js and styled with Tailwind CSS, it provides a seamless user experience for users to view, create, and interact with content.

## Architecture

The application is built on a component-based architecture, with the following key aspects:

- Frontend Framework: Using Next.js, leveraging server-side rendering and API routing for improved performance.
- Styling: Tailwind CSS for modern, utility-first CSS design.
- State Management: React's useState and custom hooks where needed.
- Image Optimization: Next.js's Image component for responsive and optimized image rendering.
- Directory Structure:
  /app: Contains all application logic and routing structure.
  /public: Houses static assets such as images.
  /components: Modular, reusable UI components like Navbar and Footer.
- Database: Supabase Database stores user data such as their posted art and comments on other posts.
- Authentication: OAuth authentication with Supabase for GitHub login.
- Deployment: The application is hosted on Vercel, which supports serverless functions and automatic deployments from GitHub.

## Approach and Methodology

The development process followed these principles:

- Modularity: Breaking down the UI into reusable components, such as Post, Footer, and Navbar.
- Responsive Design: Ensuring the app works seamlessly across devices using Tailwind's responsive utilities.
- Accessibility: Adhering to web accessibility standards by using semantic HTML and readable styles.
- Iterative Development: Prioritizing core functionality and gradually enhancing design and interactivity.

## How-to locally run the project

1. Clone the repository
   git clone https://github.com/hello555/artblock.git
2. Install dependencies
   npm install
3. Setup Environment Variables
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
4. Run the development server
   npm run dev
5. This will start the application on http://localhost:3000, try it on your browser.
