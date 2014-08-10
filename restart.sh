echo "stopping"
./stop.sh
echo "stopped"
nohup ./run.sh > run.output &
echo "process is running .. "
