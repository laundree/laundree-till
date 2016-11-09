while true; do
    rm /tmp/.X0-lock &>/dev/null || true
    modprobe -r pn533
    startx /usr/src/node_modules/electron/dist/electron /usr/src --enable-logging
done
