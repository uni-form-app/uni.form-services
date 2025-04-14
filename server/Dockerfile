# Use the official Node.js Alpine image as the base image
FROM node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Install dependencies only for building the application
COPY server/package*.json ./
RUN npm install --only=production

# Copy the rest of the application code to the working directory
COPY server/ ./

# Generate Prisma client
RUN npx prisma generate

# Use a smaller runtime image for the final build
FROM node:18-alpine as runtime

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]