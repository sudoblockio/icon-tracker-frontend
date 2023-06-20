import configparser
import os

config = configparser.RawConfigParser()
config.read('./e2e/configuration/config.ini')

config = configparser.RawConfigParser()
config_file = os.path.join(
    os.path.dirname(__file__), "../../e2e/configuration/config.ini"
)
config.read(config_file)


class ReadConfig:
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

    @staticmethod
    def getAddressUrl():
        return config.get('address url', 'address_url')

    @staticmethod
    def getContractMainUrl():
        return config.get('contract url', 'contract_main_url')
