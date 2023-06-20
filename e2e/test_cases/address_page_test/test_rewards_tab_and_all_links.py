import time

import pytest

from e2e.page_objects.MainPage import MainPage
from e2e.page_objects.AddressPage import AddressPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyRewardsTabAndAllLinks:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()
    verifyUrl = "https://tracker.icon.community/addressreward"

    @pytest.mark.address_page
    def test_rewards_tab_and_all_links(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_006_Verify_rewards_tab_and_all_links...*******")
        self.driver.get(ReadConfig.getExpectedUrl(1))

        self.addressPageObj.click_on_rewards_tab()

        for i in range(0, 10, 1):
            self.addressPageObj.verify_all_links_in_rewards_tab_works(count=i)
            time.sleep(2)
            self.addressPageObj.click_total_transaction_count()

            self.addressPageObj.verify_transaction_detail_page(title="Rewards")

            self.addressPageObj.verify_transaction_detail_page_url(url=self.verifyUrl)
        self.logger.info("********Finished test case Test_006_Verify_rewards_tab_and_all_links...*******")

