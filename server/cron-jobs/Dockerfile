FROM golang:1.16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Build the application
RUN go build -o cron-jobs

# Expose the port that the application will listen on
EXPOSE 8080

# Start the application when the container starts
CMD ["./cron-jobs"]
