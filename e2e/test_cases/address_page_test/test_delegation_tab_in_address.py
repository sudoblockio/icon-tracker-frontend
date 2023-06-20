import time

import pytest

from e2e.page_objects.MainPage import MainPage
from e2e.page_objects.address_page import AddressPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyDelegationTabInAddress:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.address_page
    @pytest.mark.standalone
    def test_delegation_tab_in_address(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_009_Verify_delegation_tab_in_address...*******")
        self.driver.get(ReadConfig.getAddressUrl())

        for i in range(0, 3, 1):
            self.addressPageObj.click_on_delegation_tab()

            self.addressPageObj.verify_all_links_in_delegation_table(count=i)
            time.sleep(2)

            self.addressPageObj.verify_page_not_open_in_new_tab()
            self.driver.get(ReadConfig.getAddressUrl())
            time.sleep(3)

        self.logger.info("********Finished test case Test_009_Verify_delegation_tab_in_address...*******")
