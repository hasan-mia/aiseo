# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the app
# CMD ["npm", "start"]

CMD ["npm", "run", "start"]

# docker build -t aiseo .

# docker run -p 8080:8080 aiseo