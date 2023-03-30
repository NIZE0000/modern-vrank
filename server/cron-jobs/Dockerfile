FROM golang:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Download and install any required dependencies
RUN go mod download

# Build the application
RUN go build -o cron-jobs ./cmd/main/main.go 

# Start the application when the container starts
CMD ["./cron-jobs"]
