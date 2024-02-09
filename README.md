[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/2sZOX9xt)

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#project-setup">Project Setup</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Implemented a logs viewer application:

**Features:**

1. **Virtualized Table:**

   - Display logs from the backend in a virtualized table to optimize performance, especially when dealing with large datasets.

2. **Filtering Options:**

   - Enable filtering based on specific table columns, providing a seamless user experience. Supported filters include:
     - Resource Id
     - Level
     - Parent Resource Id
     - Trace Id
     - Span Id
     - Start and End date-time stamp, allowing users to filter logs within specified date ranges.

3. **Virtualized Filter Dropdowns:**

   - Implement virtualized filter dropdowns to efficiently handle large datasets, ensuring a smooth and responsive filtering experience for users.

4. **Combined Filters:**

   - Allow users to apply multiple filters simultaneously. For example, users can filter logs based on both Resource Id and Span Id concurrently, providing a fine-grained approach to data refinement.

5. **Search Functionality:**
   - Incorporate a search box that enables users to search for specific keywords or patterns within the entire table. This enhances the ability to locate relevant information.
   - Regular expressions are utilized for search as well.

These features collectively contribute to a powerful and user-friendly log management system.

**System Design Overview:**

**Backend:**

- **Express.js:**

  - Employed Express.js as the backend framework, leveraging its simplicity and robustness to handle HTTP requests and responses effectively.

- **MongoDB:**
  - Utilized MongoDB as the database system for efficient and scalable data storage, enabling seamless retrieval and manipulation of logs.

**Frontend:**

- **React.js with TypeScript:**

  - Developed the frontend using React.js with TypeScript, combining the declarative nature of React and the enhanced type safety of TypeScript for a more reliable and maintainable codebase.

- **Modular Approach:**

  - Adopted a modular approach in designing components, ensuring a scalable and maintainable code structure. This facilitates easy addition or modification of features without affecting other parts of the system.

- **Decoupled Logic:**
  - Implemented a decoupled architecture by separating core logic from the user interface. Achieved this by crafting services and utilities to encapsulate and handle the core functionalities independently. This separation enhances code readability, testability, and maintainability.

**API Design:**

- **Endpoints:**
  - Established separate API endpoints for distinct functionalities:
    - Fetching all logs
    - Retrieving logs based on filters applied
    - Retrieving logs based on search query

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- React js
- Typescript
- Nodejs
- Mongo DB
- Express js

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Configure MongoDB on your system based on the operating system, choosing the appropriate steps for either macOS or Windows, as outlined below:

install node js : https://nodejs.org/en/download

**MongoDB Setup on macOS:**

1. **Install Homebrew:**

   - Open Terminal and run the following command to install Homebrew:

     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
     ```

2. **Install MongoDB with Homebrew:**

   - Run the following command to install MongoDB:

     ```bash
     brew tap mongodb/brew
     brew install mongodb-community
     ```

3. **Start MongoDB:**

   - Start MongoDB as a background service:

     ```bash
     brew services start mongodb-community
     ```

   - MongoDB should now be running.

4. **Access MongoDB Shell:**

   - To access the MongoDB shell, run:

     ```bash
     mongo
     ```

**MongoDB Setup on Windows**

1. **Download MongoDB Installer:**

   - Download the MongoDB Community Edition installer for Windows from the official MongoDB website: [MongoDB Download Center](https://www.mongodb.com/try/download/community).

2. **Run the Installer:**

   - Run the downloaded installer and follow the installation instructions. Choose the "Complete" installation option.

3. **Start MongoDB:**

   - MongoDB will be installed as a Windows service. You can start and stop the service using the Services application (`services.msc`) or by using the Command Prompt.

   - To start MongoDB from the Command Prompt, navigate to the MongoDB installation directory (usually `C:\Program Files\MongoDB\Server\[version]\bin`) and run:

     ```bash
     mongod
     ```

   - Leave the Command Prompt window open to keep the MongoDB server running.

4. **Access MongoDB Shell:**

   - Open a new Command Prompt and navigate to the MongoDB installation directory. Run the following command to start the MongoDB shell:

     ```bash
     mongo
     ```

These commands help you confirm that MongoDB is installed and running correctly on your system. Adjust the steps as needed based on your preferences and requirements.

### Project Setup

1. **Backend Setup:**

   - Navigate to the `backend` folder in your terminal:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     node app.js
     ```

2. **Frontend Setup - Log Ingestor App:**
   - Navigate to the `frontend/log-ingestor-app` folder in your terminal:
     ```bash
     cd frontend/log-ingestor-app
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```
3. **Ingest Logs Over Port 3000:**
   - Utilize the following API endpoint, 'http://localhost:3000/api/logs/log' to ingest logs on port 3000.
   - To insert random logs over port 3000 - run the command 'node logsGenerator.js' in from the 'backend folder - cd backend' from your terminal

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

application implementation screenshots:
![task screenshot-1][screenshot-1]

- Utilize the filter dropdown and search bar to find specific logs within the table.

demo-video link: https://www.loom.com/share/fd9144919ab9408886b2165258f594dc?sid=7a05c4fd-c6a5-4a2e-8285-cc61f164559e

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

name: Jhosiah Felips Daniel,

social-media : [linkedin](https://www.linkedin.com/in/jhosiah-felips-daniel-ba6535149/),

email: dfelips@gmail.com,

contact: +91 7397031068,

resume-link: https://drive.google.com/file/d/1MaVNMqnDf9MRkOVaLObQtrTIOzAsupfx/view?usp=sharing

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[screenshot-1]: images/ss1.png
