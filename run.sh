# run this script by CD to this folder and `./run.sh &>run.output &`
echo $$ > GUARD_PID
while true ; do
echo "$(date) : checking if server is up"
`wget --no-cache --spider -q localhost:9001`
if [ $? -ne 0 ]; then
   echo "$(date) : Site is down. Restarting it"
   nohup node server.js &
   echo $! > NODE_PID
else
   echo "$(date) : Site is up"
fi
echo "$(date) : sleeping for 2 minutes"
sleep 2m
done
