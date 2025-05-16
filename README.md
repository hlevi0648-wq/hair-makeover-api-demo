# Runway API Hair Makeover NextJS Example

This application demonstrates how to integrate with the Runway API to generate hair makeovers based on a user-uploaded selfie and a selected hairstyle.

- Enter your Runway API key using the "Get started" button in the header.
- Upload a selfie.
- Select a hairstyle.
- Click "Generate".

## Getting Started

### Prerequisites

- Node.js
- npm
- Runway API key (you can get one at [https://dev.runwayml.com/](https://dev.runwayml.com/))

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

### API Key Configuration

This application requires a Runway API key to function.

- **Frontend**: The API key is entered via a popover in the application's header (click "Get started"). It is then stored in your browser's `localStorage`.
- **Backend**: The frontend sends the API key to the backend API endpoint (`/api/generate`) via an `Authorization: Bearer <YOUR_API_KEY>` header. Your backend code for this endpoint needs to be configured to read and use this header for authenticating requests to the Runway API.

If your backend has other routes or services that interact directly with the Runway API (not initiated by this client-side flow), you would typically configure an API key for those using environment variables. However, for the image generation feature in this demo, the key from the `Authorization` header is used.

### Running the application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

- [Runway API Documentation](https://docs.runwayml.com/docs/overview)
- [Next.js Documentation](https://nextjs.org/docs)
