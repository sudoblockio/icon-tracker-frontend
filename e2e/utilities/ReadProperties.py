import configparser

config = configparser.RawConfigParser()
config.read('./e2e/configuration/config.ini')

class ReadConfig:
    @staticmethod
    def getBaseUrl():
        return config.get('common info', 'baseurl')

    @staticmethod
    def getQuery(count):

        if count == 1:
            return config.get('search param', 'query_one')
        elif count == 2:
            return config.get('search param', 'query_two')
        elif count == 3:
            return config.get('search param', 'query_three')

    @staticmethod
    def getExpectedUrl(count):

        if count == 1:
            return config.get('search param', 'query_one_url')
        elif count == 2:
            return config.get('search param', 'query_two_url')
        elif count == 3:
            return config.get('search param', 'query_three_url')
