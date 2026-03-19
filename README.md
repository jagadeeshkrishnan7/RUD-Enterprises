# Fabrication Company Corporate Website (React + Vite)

Modern frontend-only website for a fabrication company with dynamic admin-managed content.

## Tech Stack

- React + Vite
- React Router (`/` and `/admin` routes)
- Tailwind CSS
- Framer Motion
- EmailJS (`@emailjs/browser`)
- LocalStorage as the data layer

## Features

- Sticky corporate header with logo, company name, and Contact Us action
- Home page with hero section and admin-controlled dynamic sections
- Contact modal popup (no URL change) with validation and EmailJS sending states
- About modal popup (no URL change) with header, image gallery, and description
- Footer with address, two emails, two phone numbers, and About link
- `/admin` panel to update:
	- Logo upload (base64)
	- Company name
	- Hero content
	- Contact modal header/description/recipient email
	- Footer contact info
	- Home section add/edit/delete (unlimited)
	- About header, description, and images
	- Theme colors (background and primary)
- CSS variable based theme system applied globally

## Project Structure

```
src/
	admin/
		AdminPanel.jsx
	components/
		AboutModal.jsx
		ContactModal.jsx
		DynamicSection.jsx
		Footer.jsx
		Header.jsx
		HeroSection.jsx
		Modal.jsx
	pages/
		HomePage.jsx
	utils/
		image.js
		storage.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure EmailJS:

- Copy `.env.example` to `.env`
- Fill values:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

3. Run development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Notes

- All content is persisted in localStorage key `fabrication_company_site_v1`.
- Admin route is intentionally not linked in UI and is accessible only via direct `/admin` URL.
