import time
import pytest

from e2e.page_objects.contract_page import ContractPage
from e2e.page_objects.main_page import MainPage
from e2e.utilities.logger import LogGen
from e2e.config import config


class TestVerifyTokenTransferTabAndAllLinksPresent:
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_token_transfer_tab_and_all_links_present(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_014_Verify_token_transfer_tab_and_all_links_present"
                         "...*******")
        self.driver.get(config.contract_contract_path)

        self.contractPageObj.click_token_transfer_tab()

        for i in range(0, 10, 1):
            time.sleep(config.default_sleep)
            self.contractPageObj.verify_all_links_in_token_transfer_tab(count=i)
            self.driver.get(config.contract_contract_path)
            time.sleep(config.default_sleep)
            self.contractPageObj.click_token_transfer_tab()

        self.logger.info("********Finished test case "
                         "Test_014_Verify_token_transfer_tab_and_all_links_present"
                         "...*******")
