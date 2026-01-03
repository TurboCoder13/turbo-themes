# syntax=docker/dockerfile:1
# CI-like environment to run local builds/tests

FROM ruby:3.4-bookworm

# Install OS deps and Node.js LTS (22.x)
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    curl=7.88.1-10+deb12u14 \
    ca-certificates=20230311+deb12u1 \
    git=1:2.39.5-0+deb12u2 \
    jq=1.6-2.1+deb12u1 \
    lsof=4.95.0-1 \
    build-essential=12.9 \
    locales=2.36-9+deb12u13 \
    software-properties-common=0.99.30-4.1~deb12u1 \
  && rm -rf /var/lib/apt/lists/* \
  && sed -i 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
  && locale-gen

# Install Python 3.13 for lintro compatibility
# hadolint ignore=DL3003
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential=12.9 \
    libssl-dev=3.0.17-1~deb12u3 \
    zlib1g-dev=1:1.2.13.dfsg-1 \
    libbz2-dev=1.0.8-5+b1 \
    libreadline-dev=8.2-1.3 \
    libsqlite3-dev=3.40.1-2+deb12u2 \
    llvm=1:14.0-55.7~deb12u1 \
    libncursesw5-dev=6.4-4 \
    xz-utils=5.4.1-1 \
    tk-dev=8.6.13 \
    libxml2-dev=2.9.14+dfsg-1.3~deb12u4 \
    libxmlsec1-dev=1.2.37-2 \
    libffi-dev=3.4.4-1 \
    liblzma-dev=5.4.1-1 \
  && curl -fL --progress-bar https://www.python.org/ftp/python/3.13.0/Python-3.13.0.tgz -o Python-3.13.0.tgz \
  && tar xzf Python-3.13.0.tgz \
  && cd Python-3.13.0 \
  && ./configure --enable-optimizations \
  && make -j "$(nproc)" \
  && make altinstall \
  && cd .. \
  && rm -rf Python-3.13.0* \
  && rm -rf /var/lib/apt/lists/*

# Install hadolint (Dockerfile linter) for lintro checks
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN HADOLINT_VERSION="2.14.0" \
  && BIN_NAME="hadolint-linux-$(uname -m | sed 's/x86_64/x86_64/;s/amd64/x86_64/;s/arm64/arm64/;s/aarch64/arm64/')" \
  && URL="https://github.com/hadolint/hadolint/releases/download/v${HADOLINT_VERSION}/${BIN_NAME}" \
  && CHECKSUM_URL="${URL}.sha256" \
  && echo "📦 Installing hadolint v${HADOLINT_VERSION} from ${URL}..." \
  && curl -sSfL "${URL}" -o /usr/local/bin/hadolint \
  && curl -sSfL "${CHECKSUM_URL}" -o /tmp/hadolint.sha256 \
  && echo "$(cat /tmp/hadolint.sha256 | cut -d' ' -f1)  /usr/local/bin/hadolint" | sha256sum -c - \
  && rm /tmp/hadolint.sha256 \
  && chmod +x /usr/local/bin/hadolint
SHELL ["/bin/sh", "-c"]

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

# NodeSource for Node 22
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends nodejs=22.* \
  && rm -rf /var/lib/apt/lists/*
SHELL ["/bin/sh", "-c"]

# Install Bun (preferred package manager/runtime)
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -fsSL https://bun.sh/install | bash \
  && mv /root/.bun/bin/bun /usr/local/bin/bun \
  && mv /root/.bun/bin/bunx /usr/local/bin/bunx \
  && rm -rf /root/.bun
SHELL ["/bin/sh", "-c"]

# Ensure Bundler version matches Gemfile.lock (2.3.26)
RUN gem install bundler:2.3.26

WORKDIR /work

# Pre-copy only manifests for better Docker layer caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --lockfile bun.lock \
  && bunx playwright install --with-deps chromium

# Install Python package manager uv
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
SHELL ["/bin/sh", "-c"]
ENV PATH="/root/.local/bin:${PATH}"
ENV UV_PYTHON="/usr/local/bin/python3.13"

# Install Ruby deps using Gemfile / Gemfile.lock
COPY Gemfile Gemfile.lock ./
RUN bundle _2.3.26_ install

# Copy the rest of the repo
COPY . .

# Ensure local tool bin is on PATH for any tools installed there
ENV PATH="/work/.bin:${PATH}"

# Default command runs the quick CI (no serve, no lighthouse)
CMD ["/bin/bash", "-lc", "./scripts/local/build.sh --quick --no-serve"]


