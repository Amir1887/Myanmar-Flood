# Myanmar-Flood  

This project is focused on developing tech solutions to improve disaster response for Myanmar's flood crisis that started on 9 September 2024. The app will assist in real-time damage assessment, needs analysis, and provide a dashboard for decision-makers and aid organizations.  

## Technology Stack  
-------------------------------------  
- **PostgreSQL**: A SQL database for storing application data.  
- **Express.js**: A web application framework for Node.js.  
- **React**: A JavaScript library for building user interfaces.  
- **Node.js**: A JavaScript runtime for server-side programming.  
- **Retool**: A platform to build internal tools and dashboards for visualizing collected data.  
- **Azure Web App**: PaaS by Azure to deploy the Express application.  
- **Azure Static Web Apps**: PaaS by Azure to deploy static assets (React App).  

## Prerequisites for Local Deployment  
---------------------------------------  
Before you begin, ensure you have the following requirements met:  
- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).  
- **PostgreSQL**: Set up a PostgreSQL database locally or using a cloud provider.  
- **Docker (optional)**: Install Docker from [docker.com](https://www.docker.com/) for containerized deployment.  

## Installation  
---------------  
1. Clone the repository:  
    ```bash  
    git clone https://github.com/Amir1887/Myanmar-Flood.git  
    cd Myanmar-Flood  
    ```  

2. Install server dependencies:  
    ```bash  
    cd back-end  # Navigate to the backend directory  
    npm install  
    ```  

3. Set up environment variables in the server directory (.env file):  
    ```bash  
    DATABASE_URL=<your-postgresql-connection-string>  
    PORT=4000 
    ```  

4. Install client dependencies:  
    ```bash  
     cd ../front-end/myanmar-flood  # Navigate to the frontend directory   
    npm install  
    ```  

5. Set up environment variables for the client in the client directory (.env file):  
    ```bash  
    VITE_API_URL=http://localhost:3000  
    ```  

## Running the Application  
---------------  
1. Run the server (from the server directory):  
    ```bash  
    npm run dev  
    ```  

   Or with Nodemon (if installed):  
    ```bash  
    nodemon server.js  
    ```  

   The backend should be running at http://localhost:4000.  

2. Run the client (from the client directory):  
    ```bash  
    npm run dev  
    ```  

   The frontend should be running at http://localhost:3000.  

## Deploying to Azure  
---------------  
1. Deploy the Express backend using Azure Web App.  
2. Deploy the React frontend using Azure Static Web Apps.  
3. Connect both services to ensure seamless communication between frontend and backend.  

## Contributing  
---------------  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-branch`).  
3. Make your changes.  
4. Commit your changes (`git commit -m 'Add some feature'`).  
5. Push to the branch (`git push origin feature-branch`).  
6. Open a pull request.
