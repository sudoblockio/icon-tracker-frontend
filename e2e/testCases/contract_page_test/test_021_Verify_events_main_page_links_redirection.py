import time

import pytest

from e2e.pageObjects.ContractPage import ContractPage
from e2e.pageObjects.MainPage import MainPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class Test_021_Verify_events_main_page_links_redirection:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_021_Verify_events_main_page_links_redirection(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_021_Verify_events_main_page_links_redirection"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())

        self.contractPageObj.click_events_tab()

        for i in range(0, 10, 1):
            time.sleep(2)
            self.contractPageObj.verify_all_links_in_events_tab(count=i)
            self.driver.get(ReadConfig.getContractMainUrl())
            time.sleep(1)
            self.contractPageObj.click_events_tab()

        self.logger.info("********Finished test case "
                         "Test_021_Verify_events_main_page_links_redirection"
                         "...*******")