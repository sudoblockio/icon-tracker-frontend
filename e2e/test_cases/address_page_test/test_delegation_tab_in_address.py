import time
import pytest

from e2e.page_objects.main_page import MainPage
from e2e.page_objects.address_page import AddressPage
from e2e.utilities.logger import LogGen
from e2e.config import config


class TestVerifyDelegationTabInAddress:
    logger = LogGen.loggen()

    @pytest.mark.address_page
    def test_delegation_tab_in_address(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_009_Verify_delegation_tab_in_address...*******")
        self.driver.get(config.delegations_address_url)

        self.addressPageObj.click_on_delegation_tab()
        self.addressPageObj.verify_all_links_in_delegation_table(count=0)
        time.sleep(config.default_sleep)

        self.driver.get(config.delegations_address_url)
        self.logger.info("********Finished test case Test_009_Verify_delegation_tab_in_address...*******")
