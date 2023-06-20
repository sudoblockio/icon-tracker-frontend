import time
import pytest

from e2e.page_objects.contract_page import ContractPage
from e2e.page_objects.main_page import MainPage
from e2e.utilities.logger import LogGen
from e2e.utilities.read_properties import ReadConfig
from e2e.config import config


class TestVerifyAllLinksInTransactionTabWorksInContractPage:
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_all_links_in_transaction_tab_works_in_contract_page(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_011_Verify_all_links_in_transaction_tab_works_in_contract_page"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())

        self.contractPageObj.click_transaction_tab()

        for i in range(0, 10, 1):
            time.sleep(2)
            self.contractPageObj.verify_all_links_in_transaction_tab(count=i)
            self.driver.get(ReadConfig.getContractMainUrl())
            time.sleep(1)
            self.contractPageObj.click_transaction_tab()

        self.logger.info("********Finished test case "
                         "Test_011_Verify_all_links_in_transaction_tab_works_in_contract_page"
                         "...*******")
