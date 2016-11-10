#!/usr/bin/env bash

set -e

eval "$(ssh-agent -s)"
chmod 0600 id_rsa
ssh-add ./id_rsa
cat resinkey >> ~/.ssh/known_hosts
git remote add resin g_christian_budde_christensen@git.resin.io:g_christian_budde_christensen/laundree1.git
git push resin master
