import time
import pytest

from e2e.page_objects.main_page import MainPage
from e2e.page_objects.address_page import AddressPage
from e2e.utilities.logger import LogGen
from e2e.config import config


class TestVerifyNewAddressUrlTransactionTab:
    logger = LogGen.loggen()

    @pytest.mark.address_page
    def test_new_address_url_transaction_tab(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_008_Verify_new_address_url_transaction_tab...*******")
        self.driver.get(config.prep_address_url)

        for i in range(0, 6, 1):
            self.addressPageObj.verify_all_links_in_transaction_new_address_url(count=i)

            time.sleep(config.default_sleep)
            self.addressPageObj.verify_page_not_open_in_new_tab()

            self.driver.get(config.prep_address_url)
            time.sleep(config.default_sleep)

        self.logger.info("********Finished test case Test_008_Verify_new_address_url_transaction_tab...*******")
