FROM node:14

# Set up working dir
WORKDIR /app

# Copy package json files and install
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Expose the listening port of your app
EXPOSE 4000

CMD [ "npm", "start" ] 