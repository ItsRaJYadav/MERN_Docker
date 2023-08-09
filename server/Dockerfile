# FROM node:alpine3.17

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install server application dependencies
# RUN npm install
# # 
# # Copy the server application code
# COPY . .

# # Copy the .env file from the server's root folder to the working directory inside the container
# COPY .env ./

# # Expose port 5000 for the server
# EXPOSE 5000

# # Start the server application
# CMD ["npm", "start"]
FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5000
