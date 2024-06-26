import time
import pytest

from e2e.page_objects.main_page import MainPage
from e2e.page_objects.address_page import AddressPage
from e2e.utilities.logger import LogGen
from e2e.config import config


class TestVerifyRewardsTabAndAllLinks:
    logger = LogGen.loggen()
    verifyUrl = f"{config.base_url}/addressreward"

    @pytest.mark.address_page
    def test_rewards_tab_and_all_links(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_006_Verify_rewards_tab_and_all_links...*******")
        self.driver.get(config.prep_address_url)

        self.addressPageObj.click_on_rewards_tab()

        for i in range(0, 10, 1):
            self.addressPageObj.verify_all_links_in_rewards_tab_works(count=i)
            time.sleep(config.default_sleep)
            self.addressPageObj.click_total_transaction_count()

            self.addressPageObj.verify_transaction_detail_page(title="Rewards")

            self.addressPageObj.verify_transaction_detail_page_url(url=self.verifyUrl)
        self.logger.info("********Finished test case Test_006_Verify_rewards_tab_and_all_links...*******")

