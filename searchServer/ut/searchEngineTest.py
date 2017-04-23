import unittest
import searchServer
class SearchEngineTestCase(unittest.TestCase):
    def setUp(self):
        self.engine = searchServer.SearchEngine()
    def tearDown(self):
       del self.engine
    def testConnect(self):
        conn = self.engine.connectDB()
        self.assertTrue(conn, "connect DB")
