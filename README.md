# Interactive Resume / Portfolio

This is a modern, interactive resume and portfolio web application. It features a sleek, animated user interface and provides a downloadable PDF version of the resume.

## 🚀 Tech Stack

If you're asked how this project was built, here is the complete technology stack:

- **Framework**: [Next.js (v16)](https://nextjs.org/) - Utilizing the App Router for routing and rendering.
- **UI Library**: [React (v19)](https://react.dev/) - For building reusable UI components.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Ensuring type safety and better developer experience.
- **Styling**: [Tailwind CSS (v4)](https://tailwindcss.com/) - Utility-first CSS framework for rapid and responsive UI development.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - For smooth micro-interactions, page transitions, and element animations.
- **Icons**: [Lucide React](https://lucide.dev/) - A beautiful and consistent icon library.
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/) - Used to dynamically generate a downloadable PDF version of the resume directly in the browser.

## 📁 Project Structure

Here is an overview of the key directories and files in the project:

```
├── src/
│   └── app/
│       ├── components/          # Reusable UI components
│       │   ├── DownloadModal.tsx # Modal for PDF download options
│       │   ├── PdfTemplate.tsx   # React component defining the PDF layout
│       │   └── ProfileAvatar.tsx # Component for displaying the user's avatar
│       ├── cvData.ts            # 📄 Centralized data file containing all resume content (experience, skills, etc.)
│       ├── globals.css          # Global CSS, including Tailwind directives and custom variables
│       ├── layout.tsx           # Root Next.js layout component
│       └── page.tsx             # Main entry point (Landing Page / Interactive Resume UI)
├── public/                      # Static assets (images, icons)
├── package.json                 # Project dependencies and scripts
├── tailwind.config.ts / postcss # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

### 💡 How It Works

1. **Data Management**: All the resume data (name, contact info, work experience, education, skills) is stored in a single TypeScript file (`src/app/cvData.ts`). This makes it extremely easy to update your information without digging into the component code.
2. **Interactive UI**: The main page (`src/app/page.tsx`) imports this data and renders it using various interactive sections, styled with Tailwind CSS and animated with Framer Motion.
3. **PDF Generation**: When a user clicks "Download Resume", the `DownloadModal` is triggered. It uses `@react-pdf/renderer` to render the `PdfTemplate.tsx` component, which takes the same `cvData.ts` and formats it into a professional, printable PDF document.

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/app/page.tsx` or update your details in `src/app/cvData.ts`.
