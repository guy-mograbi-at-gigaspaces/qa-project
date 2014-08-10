kill -9 `cat GUARD_PID`
kill -9 `cat NODE_PID`
rm -f GUARD_PID
rm -f NODE_PID

