import time

import pytest

from e2e.page_objects.ContractPage import ContractPage
from e2e.page_objects.MainPage import MainPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyTokenTransferTabAndAllLinksPresent:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_token_transfer_tab_and_all_links_present(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_014_Verify_token_transfer_tab_and_all_links_present"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())

        self.contractPageObj.click_token_transfer_tab()

        for i in range(0, 10, 1):
            time.sleep(2)
            self.contractPageObj.verify_all_links_in_token_transfer_tab(count=i)
            self.driver.get(ReadConfig.getContractMainUrl())
            time.sleep(1)
            self.contractPageObj.click_token_transfer_tab()

        self.logger.info("********Finished test case "
                         "Test_014_Verify_token_transfer_tab_and_all_links_present"
                         "...*******")
