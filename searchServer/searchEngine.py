#!/usr/bin/python
import psycopg2
from indigo_renderer import *

class SearchEngine:
    conn = None

    def __init__(self, str = ""):
        if self.__class__.conn is None:
            self.__class__.conn = self.conectDB(str)
    # connectionStringPG: "postgres://postgres:postgres@115.28.62.4:5432/mydb"

    def conectDB(self, str):
        try:
            if str == "":
                conn = psycopg2.connect(
                    "dbname='mydb' user='postgres' host='115.28.62.4' password='postgres'")
                return conn
        except:
            print "unable to connect to the database"

    def exact(self, mol):
        conn = self.__class__.conn
        cur = conn.cursor()
        sql = "select \"CAS\",molfile from bingo.yin1 where molfile @ ('{0}', 'NONE')::bingo.exact;".format(mol)
        cur.execute(sql)
        conn.commit()
        return cur.fetchall()

    def getSVGFromMol(self, results):
        indigo = Indigo()
        indigoRenderer = IndigoRenderer(indigo)
        indigo.setOption("render-output-format", "svg")
        indigo.setOption('treat-x-as-pseudoatom', True)
        indigo.setOption("ignore-stereochemistry-errors", True)

        arr = []
        for item in results:
            mol = indigo.loadMolecule(item[1])
            bff = indigoRenderer.renderToBuffer(mol)
            arr.append(bff.tostring())
        return arr

    def checkMol(self, mol):
        sql = "select bingo.CheckMolecule('{0}');".format(mol)
        conn = self.__class__.conn
        cur = conn.cursor()
        cur.execute(sql)
        result = cur.fetchone()
        conn.commit()
        return result[0] is None

    def getResults(self, mol):
        if not self.checkMol(mol):
            return None
        results = self.exact(mol)
        svgArr = self.getSVGFromMol(results)
        arr = []
        for i in results:
            arr.append(i[0])
        dictionary = dict(zip(arr, svgArr))
        return dictionary

if __name__ == '__main__':
    print "test search engine"
    # password should be stored in a management with cryptencryption
    try:
        conn = psycopg2.connect(
            "dbname='mydb' user='postgres' host='115.28.62.4' password='postgres'")
    except:
        print "I am unable to connect to the database"
    else:
        # The class cursor allows interaction with the database
        cur = conn.cursor()

        # sql = "select bingo.CheckMolecule('{0}');".format('kll,.22-');
        # cur.execute(sql)
        # print cur.fetchone()

        # send commands to the database using methods
        # such as execute() and executemany(),
        cur.execute(
            """select cas, mofile from bingo."MolTable" limit 20;""")

        # retrieve data from the database by iteration or using methods
        # such as fetchone(), fetchmany(), fetchall().

        indigo = Indigo()
        indigoRenderer = IndigoRenderer(indigo)
        indigo.setOption("render-output-format", "svg")
        indigo.setOption("render-highlight-color-enabled", "true")
        # print cur.fetchone()
        # mol = indigo.loadMolecule(cur.fetchone()[0])
        # indigoRenderer.renderToFile(mol, "test.svg")

        for item in cur.fetchall():
            # print(item[0])
            print(item[1])
            mol = indigo.loadMolecule(item[1])
            bff = indigoRenderer.renderToBuffer(mol)
            # f.write(bff)
            print bff.tostring()
            break

    finally:
        conn.commit()
        # Close communication with the database
        cur.close()
        conn.close()
