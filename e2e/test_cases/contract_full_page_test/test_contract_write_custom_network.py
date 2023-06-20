import time
import pytest

from e2e.page_objects.contract_page import ContractPage
from e2e.page_objects.main_page import MainPage
from e2e.utilities.logger import LogGen
from e2e.utilities.read_properties import ReadConfig
from e2e.config import config

class TestContractFullPageCustomNetwork:
    baseurl = ReadConfig.getBaseUrl()
    baseurl = config.base_url

    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_contract_write_custom_network(
            self,
            setup,
            setup_custom_network,
    ):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

