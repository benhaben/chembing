#!/usr/bin/python
# -*- coding: UTF-8 -*-

from indigo import *
import logging
import json
import os
import sys
os.chdir(os.path.dirname(sys.argv[0]))

logging.basicConfig(filename=os.path.join(os.getcwd(), 'log.txt'),\
level = logging.NOTSET, filemode = 'w', format = '%(asctime)s - %(levelname)s: %(message)s')

indigo = Indigo()
print "Indigo version " + indigo.version()
mol = indigo.loadMoleculeFromFile('structure-1.mol')

mol = indigo.loadMolecule(" CWRITER302041420202D                              Created with ChemWriter - http://chemwriter.com 6  6  0  0  0  0  0  0  0  0999 V2000   2.3616   -3.9739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0   3.2276   -4.4739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0   4.0936   -3.9739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0   4.0936   -2.9739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0   3.2276   -2.4739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0   2.3616   -2.9739    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0 1  2  1  0  0  0 2  3  1  0  0  0 3  4  1  0  0  0 4  5  1  0  0  0 5  6  1  0  0  0 6  1  1  0  0  0 M  END")
logging.info("loadMolecule: %s" % mol)

indigo.setOption('treat-x-as-pseudoatom', True)
indigo.setOption("ignore-stereochemistry-errors", True)

arr = []

for item in indigo.iterateSDFile("19k.sdf"):
    match = indigo.exactMatch(item, mol)
    if match:
        dict = {}
        print("match!!!")
        for prop in item.iterateProperties():
            dict[prop.name()] = prop.rawData().decode('gb2312')
            logging.info(
                prop.name() + ":" + prop.rawData().decode('gb2312'))
            arr.append(dict)

info = json.dumps(arr, sort_keys=True, separators=(',', ':'))
print info