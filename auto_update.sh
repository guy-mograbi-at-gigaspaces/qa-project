#!/bin/sh

pull_updates() {
  echo "Start pulling updates..." && git pull
  echo "Rebuild the changes..." && grunt build
}

restart() {
  echo "Kill the process" & pkill qaproject
  echo "Start the process" & nohup node server.js &
}

echo "Start check for update..."

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ $LOCAL = $REMOTE ]; then
    echo "All Up-to-date"
elif [ $LOCAL = $BASE ]; then
    pull_updates
    restart
else
    echo "Something went wrong..."
fi
