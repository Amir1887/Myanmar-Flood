# Myanmar-Flood  

This project is focused on developing tech solutions to improve disaster response for Myanmar's flood crisis that started on 9 September 2024. The app will assist in real-time damage assessment, needs analysis, and provide a dashboard for decision-makers and aid organizations.  

## Technology Stack  
-------------------------------------  
- **PostgreSQL**: A SQL database for storing application data.  
- **Express.js**: A web application framework for Node.js.  
- **React**: A JavaScript library for building user interfaces.  
- **Node.js**: A JavaScript runtime for server-side programming.
- **Prisma: An ORM for database modeling and querying with PostgreSQL.
- **Retool**: A platform to build internal tools and dashboards for visualizing collected data.  
- **Azure Web App**: PaaS by Azure to deploy the Express application.  
- **Azure Static Web Apps**: PaaS by Azure to deploy static assets (React App).  

## Prerequisites for Local Deployment  
---------------------------------------  
Before you begin, ensure you have the following requirements met:  
- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).  
- **PostgreSQL**: Set up a PostgreSQL database locally or using a cloud provider.
- **Prisma: Install Prisma CLI globally or locally in your project. 
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
4. Initialize Prisma:
    Create your Prisma schema file:
    ```bash  
       npx prisma init
    ```
    Add the PostgreSQL connection string in the newly created .env file:
    ```bash  
       DATABASE_URL=postgresql://<username>:<password>@localhost:5432/MyanmarFlood?schema=public

    ```

5. Generate Prisma client and run migrations:  
    ```bash  
    npx prisma generate  
    npx prisma migrate dev --name init  
 
    ```
   ** This will apply the migrations and set up your database schema.
   
6. Install client dependencies:  
    ```bash  
     cd ../front-end/myanmar-flood  # Navigate to the frontend directory   
    npm install  
    ```  

7. Set up environment variables for the client in the client directory (.env file):  
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

## Prisma Commands Cheat Sheet  
---------------  
1. Generate Prisma Client:
     ```bash  
    npx prisma generate    
    ```  
3.Run Migrations:  
 ```bash  
  npx prisma migrate dev --name <migration_name>  
  ``` 
4. Seed Database (optional):
    **To populate the database with some initial data: 
   ```bash  
    npx prisma db seed      
    ```  
5. Prisma Studio (Database Browser):
    **To view and interact with your database: 
   ```bash  
    npx prisma studio        
    ```  
## Contributing  
---------------  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-branch`).  
3. Make your changes.  
4. Commit your changes (`git commit -m 'Add some feature'`).  
5. Push to the branch (`git push origin feature-branch`).  
6. Open a pull request.
