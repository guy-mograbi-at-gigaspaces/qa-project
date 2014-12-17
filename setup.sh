
echo "making sure global libraries exist"
( `which grunt` && echo "grunt exists" ) || (echo "installing grunt" &&  sudo npm install -g grunt-cli )
( `which bower` && echo "bower exists" ) || (echo "installing bower" && sudo npm install -g bower )
( `which compass` && echo "compass exists" )  || ( echo "installing compass" && sudo gem install compass )
sudo npm cache clean
echo "installing dependencies" && npm install
echo "installing front-end dependencies" && bower install
echo "compiling css" && grunt