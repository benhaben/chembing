import psycopg2
from indigo_renderer import *


# password should be stored in a management with cryptencryption
try:
    conn = psycopg2.connect(
        "dbname='mydb' user='postgres' host='127.0.0.1' password='123456'")
except:
    print "I am unable to connect to the database"
else:
    # The class cursor allows interaction with the database
    cur = conn.cursor()

    # send commands to the database using methods
    # such as execute() and executemany(),
    cur.execute(
        "select \"CAS\",molfile from bingo.yin1 where molfile @ ('c1ccccc1', 'NONE')::bingo.exact;")

    # retrieve data from the database by iteration or using methods
    # such as fetchone(), fetchmany(), fetchall().

    indigo = Indigo()
    indigoRenderer = IndigoRenderer(indigo)
    indigo.setOption("render-output-format", "svg")
    indigo.setOption("render-highlight-color-enabled", "true")
    # print cur.fetchone()
    # mol = indigo.loadMolecule(cur.fetchone()[0])
    # indigoRenderer.renderToFile(mol, "test.svg")

    # print cur.fetchall()
    f = open('../workfile', 'w')
    for item in cur.fetchall():
        # print(item[0])
        print(item[1])
        mol = indigo.loadMolecule(item[1])
        bff = indigoRenderer.renderToBuffer(mol)
        # f.write(bff)
        print bff.toString()
        break

finally:
    conn.commit()
    # Close communication with the database
    cur.close()
    conn.close()
