#!/usr/bin/python2.4
#
#   Hello World server in Python
#   Binds REP socket to tcp://*:5555
#   Expects b"Hello" from client, replies with b"World"
#

import zmq
import logging
from searchEngine import *
import json

#new search engine
engine = SearchEngine()

#change work dir
os.chdir(os.path.dirname(sys.argv[0]))

#config log file
logging.basicConfig(filename=os.path.join(os.getcwd(), 'log.txt'),
                    level=logging.NOTSET, filemode='w', format='%(asctime)s - %(levelname)s: %(message)s')

#start zmq listener, todo: it's two simple, should imporve
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555")
logging.info("socket.bind('tcp://*:5555')")

while True:
    #  Wait for next request from client
    message = json.loads(socket.recv())
    try:
        if u'search_by_mol' == message["method"]:
            results = engine.getResults(message["param"])
            socket.send_json(results)

    except Exception, e:
        logging.fatal(e.message)
        logging.fatal(e)