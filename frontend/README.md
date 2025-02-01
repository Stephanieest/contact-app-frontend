# Contact App Frontend

This is the frontend for the Contact App, built with React and Vite. It allows users to manage contacts and favorites through a user-friendly interface.

## Features

- View and manage users
- View and manage contacts
- View and manage favorite contacts

## Requirements

- Node.js 14+
- npm

## Getting Started

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd frontend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/       # React components for the app
│   ├── LandingPage.jsx  # Landing page component
│   ├── UserForm.jsx     # User form component
│   ├── ContactForm.jsx  # Contact form component
│   ├── FavoriteForm.jsx # Favorite form component
├── App.jsx           # Main app component
├── App.css           # Main app styles
```

## Customization

You can customize the app by modifying the components in the `src/components` directory and updating the styles in `src/App.css`.

## License

This project is licensed under the MIT License.
