# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

ARG REACT_APP_ANALYTIC_BACKEND_API=""

# Install and configure `serve`.
RUN npm install -g serve
CMD serve -s build
EXPOSE 5000

# Install all dependencies of the current project.
RUN mkdir -p /user/app
WORKDIR /user/app

COPY package.json package.json
RUN npm install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production