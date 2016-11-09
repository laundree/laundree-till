FROM resin/raspberrypi-node:slim

# Install wget and curl
RUN apt-get update && apt-get install -y \
    wget \
    curl && rm -rf /var/lib/apt/lists/*

# WTF is going on with httpredir from debian? removing it the dirty way
RUN sed -i "s/httpredir.debian.org/`curl -s -D - http://httpredir.debian.org/demo/debian/ | awk '/^Link:/ { print $2 }' | sed -e 's@<http://\(.*\)/debian/>;@\1@g'`/" /etc/apt/sources.list

# Install other apt deps
RUN apt-get update && apt-get install -y \
    apt-utils \
    build-essential \
    clang \
    xserver-xorg-core \
    xserver-xorg-input-all \
    xserver-xorg-video-fbdev \
    xorg \
    libdbus-1-dev \
    libgtk2.0-dev \
    libnotify-dev \
    libgnome-keyring-dev \
    libgconf2-dev \
    libasound2-dev \
    libcap-dev \
    libcups2-dev \
    libxtst-dev \
    libxss1 \
    libnss3-dev \
    fluxbox \
    libsmbclient \
    libssh-4 \
    fbset \
    zip \
    gcc \
    autoconf \
    automake \
    libtool \
    pkg-config \
    make \
    libpcsclite-dev \
    libusb-dev \
    libexpat-dev && rm -rf /var/lib/apt/lists/*


RUN wget https://github.com/nfc-tools/libnfc/archive/libnfc-1.7.1.tar.gz && \
    tar -xvzf libnfc-1.7.1.tar.gz && \
    sh -c "echo /usr/local/lib > /etc/ld.so.conf.d/usr-local-lib.conf" && \
    ldconfig && \
    mkdir -p .etc/nfc/devices.d && \
    (   cd libnfc-libnfc-1.7.1 && \
        autoreconf -vis && \
        ./configure --with-drivers=pn53x_usb --enable-debug --prefix=/usr --sysconfdir=/etc && \
        make && \
        make install && \
        mkdir /etc/nfc ) && \
    echo "allow_intrusive_scan = true" >> /etc/nfc/libnfc.conf

RUN mkdir ~/.fluxbox
RUN echo "xset s off" > ~/.fluxbox/startup && echo "xserver-command=X -s 0 dpms" >> ~/.fluxbox/startup
RUN echo "#!/bin/bash" > /etc/X11/xinit/xserverrc && \
    echo "" >> /etc/X11/xinit/xserverrc && \
    echo 'exec /usr/bin/X -s 0 dpms -nocursor -nolisten tcp "$@"' >> /etc/X11/xinit/xserverrc

# Set npm
RUN npm config set unsafe-perm true

# Save source folder
RUN printf "%s\n" "${PWD##}" > SOURCEFOLDER
