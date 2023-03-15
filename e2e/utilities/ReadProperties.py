import configparser

config = configparser.RawConfigParser()
config.read('./e2e/configuration/config.ini')

class ReadConfig:
    @staticmethod
    def getBaseUrl():
        return config.get('common info', 'baseurl')