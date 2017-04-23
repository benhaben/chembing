
# may be used in the server

# install java jvm
sudo mkdir /usr/lib/jvm
sudo mv ./jre1.7.0_05 /usr/lib/jvm
export JAVA_HOME=/usr/lib/jvm/jre1.7.0_05
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jre1.7.0_05/bin/java 300
java -version

# install indigo : python chem lib
export PYTHONPATH=~/git/project/indigo

sudo apt-get install python-pip

# install pyzmq
python setup.py configure --zmq=/usr/local
sudo apt-get install python-dev 
easy_install psycopg2


# see port and kill process
# lsof -i:3000 
# kill -s 9 1827 
