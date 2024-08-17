# GitHub Analytics Portal

Welcome to the **GitHub Analytics Portal**, a comprehensive platform where users can log in, explore profiles, and analyze repositories hosted on GitHub. Built with modern web technologies, this portal provides an intuitive interface for interacting with GitHub data.

## 🚀 Features

- **Login/Signup:** 
  - Users can sign in or sign up using the OAuth GitHub functionality powered by [Passport.js](https://www.passportjs.org/).
  
- **Home Page:** 
  - Explore and view profiles of GitHub users.
  - Access a comprehensive list of repositories published by the searched users.

- **Like Page:** 
  - Discover which users have liked your profile.
  
- **Explore Page:**
  - Browse popular repositories categorized by programming languages such as JavaScript, Python, C++, Java, and more.

## 🛠️ Tech Stack

The project is built with the following technologies:

### Frontend:
- **[MERN Stack](https://www.mongodb.com/mern-stack):** MongoDB, Express.js, React, Node.js.
- **[Vite](https://vitejs.dev/):** Next-generation frontend tooling for blazing fast development.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for custom designs.
- **[React Router DOM](https://reactrouter.com/):** For seamless multi-page navigation.
- **[React Icons](https://react-icons.github.io/react-icons/):** A rich set of icons for React applications.
- **[React Hot Toast](https://react-hot-toast.com/):** Toast notifications for a better user experience.

### Backend:
- **GitHub API:**
  - Utilized to fetch user data and repository information.
- **[Nodemon](https://nodemon.io/):** For live updates in the server during development.
- **[Passport.js](https://www.passportjs.org/):** Implements OAuth with GitHub for secure user authentication.

## 📂 Directory Structure

```bash
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   └── App.js
└── README.md
