FROM golang:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Download and install any required dependencies
RUN go mod download

# Build the application
RUN go build -o vrank-api ./cmd/main/main.go 

# Expose the port that the application will listen on
EXPOSE 8080

# Start the application when the container starts
CMD ["./vrank-api"]
