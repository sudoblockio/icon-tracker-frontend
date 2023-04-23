import time

import pytest

from e2e.pageObjects.MainPage import MainPage
from e2e.pageObjects.AddressPage import AddressPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class Test_008_Verify_new_address_url_transaction_tab:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.address_page
    def test_008_Verify_new_address_url_transaction_tab(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_008_Verify_new_address_url_transaction_tab...*******")
        self.driver.get(ReadConfig.getAddressUrl())

        for i in range(0, 6, 1):
            self.addressPageObj.verify_all_links_in_transaction_new_address_url(count=i)

            time.sleep(2)
            self.addressPageObj.verify_page_not_open_in_new_tab()

            self.driver.get(ReadConfig.getAddressUrl())
            time.sleep(3)

        self.logger.info("********Finished test case Test_008_Verify_new_address_url_transaction_tab...*******")
