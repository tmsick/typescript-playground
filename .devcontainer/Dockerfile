FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:12
RUN apt-get update \
    && apt-get install -y --no-install-recommends vim \
    && rm -rf /var/lib/apt/lists/*
ENV EDITOR /usr/bin/vim
