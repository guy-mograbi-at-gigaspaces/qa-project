set -e
set -x
set -v

if [ ! -x /usr/bin/node ]; then
    echo "installing node.. this might take a while"
    sudo add-apt-repository ppa:chris-lea/node.js -y
    sudo apt-get update -y
    sudo apt-get install -y nodejs
else
    echo "node already exists. skipping installation"
fi

RUBY_DEV_EXISTS=`dpkg --get-selections | grep -v deinstall | grep ruby1.9.1-dev` || echo "dev does not exist"
if [ "$RUBY_DEV_EXISTS" = "" ];then
    echo "installing ruby dev"
    sudo apt-get install ruby1.9.1-dev -y
else
    echo "ruby dev already installed"
fi

`which git` || sudo apt-get install git  -y

rm -rf qa-project && git clone https://github.com/guy-mograbi-at-gigaspaces/qa-project.git
cd qa-project

mkdir -p /home/vagrant/.npm

source setup.sh





