
echo "making sure global libraries exist"
( `which grunt` && echo "grunt exists" ) || (echo "installing grunt" &&  npm install -g grunt-cli )
( `which bower` && echo "bower exists" ) || (echo "installing bower" && npm install -g bower )
( `which compass` && echo "compass exists" )  || ( echo "installing compass" && gem install compass )

echo "installing dependencies" && npm install
echo "installing front-end dependencies" && bower install
echo "compiling css" && grunt