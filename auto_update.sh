#!/bin/sh

pull_updates() {
  echo "Start pulling updates..." && git pull
  echo "Rebuild the changes..." && grunt build
  echo "Update complete"
}

restart() {
  echo "Restarting, please wait.."
  echo "Kill the process" & pkill qaproject
  echo "Start the process" & nohup node server.js &
  echo "Restart Complete"
}

echo "Start checking for updates...($(date))"

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

echo "Auto Update complete"
