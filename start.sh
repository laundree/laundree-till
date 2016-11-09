while true; do
    rm /tmp/.X0-lock &>/dev/null || true
    modprobe -r pn533
    startx /usr/src/app/node_modules/electron/dist/electron /usr/src/app --enable-logging
done
