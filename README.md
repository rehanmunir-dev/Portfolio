# Rehan Munir Portfolio

Personal portfolio for Rehan Munir, a software engineer, frontend developer,
and UI/UX designer based in Islamabad, Pakistan.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

![Rehan Munir portfolio preview](public/linkedinn%20banner.webp)

## Live Website

[rehanmunir.tech](https://rehanmunir.techv)

## Highlights

- Responsive portfolio experience for desktop, tablet, and mobile
- Web development and UI/UX project galleries
- Smooth Framer Motion interactions and transitions
- Light and dark themes
- EmailJS-powered contact form
- SEO metadata, Open Graph previews, sitemap, and robots configuration
- Optimized WebP project imagery
- Accessible navigation and semantic page structure

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React and React Icons
- EmailJS
- Nodemailer API route support

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/rehanmunir-dev/Portfolio.git
cd Portfolio
npm install
```

Create your local environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Add your own service credentials to `.env.local`, then start the development
server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

The contact form uses these client-side EmailJS settings:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

The optional server-side contact API supports:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

Never commit `.env.local`, SMTP passwords, access tokens, or private keys.
Only placeholder variable names belong in `.env.example`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploying to Vercel

1. Import `rehanmunir-dev/Portfolio` into Vercel.
2. Keep the detected framework preset as **Next.js**.
3. Add the required environment variables in **Project Settings > Environment Variables**.
4. Deploy the `main` branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frehanmunir-dev%2FPortfolio)

## Security

- Environment files are ignored by Git.
- Build output, dependencies, Vercel metadata, and private key files are ignored.
- Secrets must be configured directly in Vercel, never committed to this repository.

## Author

**Rehan Munir**

- [GitHub](https://github.com/rehanmunir-dev)
- [LinkedIn](https://linkedin.com/in/rehanmunir343)
- [Behance](https://www.behance.net/rehanmunir2)

## License

This portfolio and its visual assets are personal work. Please do not reuse
the design, content, or project imagery without permission.
