# Use the official Ubuntu base image
FROM ubuntu:latest

# Set environment variables (optional)
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
# pyenv dependencies
RUN apt-get install -y make build-essential libssl-dev zlib1g-dev \
         libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev \
         libncursesw5-dev libncurses5 xz-utils tk-dev libffi-dev liblzma-dev \
         python3-openssl git libgdbm-dev libgdbm-compat-dev uuid-dev python3-gdbm \
         gawk

 # python alchemy/dragon build system dependency
RUN apt-get install -y python3
RUN apt-get install -y python3-pip

 # pdraw dependencies
RUN apt-get install -y build-essential yasm cmake libtool libc6 libc6-dev \
   unzip freeglut3-dev libglfw3 libglfw3-dev libjson-c-dev libcurl4-gnutls-dev \
   libgles2-mesa-dev

 # ffmpeg alchemy module build dependencies
RUN apt-get install -y rsync

 # Olympe / PySDL2 / pdraw renderer dependencies
RUN apt-get install -y libsdl2-dev libsdl2-2.0-0 libjpeg-dev libwebp-dev \
  libtiff5-dev libsdl2-image-dev libsdl2-image-2.0-0 libfreetype6-dev \
  libsdl2-ttf-dev libsdl2-ttf-2.0-0 libsdl2-gfx-dev

RUN apt-get install -y nano

RUN apt-get install -y iputils-ping

# Update the package lists and install any necessary packages
RUN pip3 install --no-cache-dir parrot-olympe \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Optionally, you can add additional commands to customize the container further

# Specify the default command to run when the container starts
CMD ["bash"]
