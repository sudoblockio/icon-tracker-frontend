import time

import pytest

from e2e.page_objects.ContractPage import ContractPage
from e2e.page_objects.MainPage import MainPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestContractFullPageCustomNetwork:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_writing_to_custom_network(
            self,
            setup,
            setup_custom_network,
    ):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

