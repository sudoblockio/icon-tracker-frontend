import time
import pytest

from e2e.page_objects.main_page import MainPage
from e2e.page_objects.address_page import AddressPage
from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyBondersTabAndAlLinks:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.address_page
    def test_bonders_tab_and_all_links(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_007_Verify_bonders_tab_and_all_links...*******")
        self.driver.get(ReadConfig.getExpectedUrl(1))

        self.addressPageObj.click_on_bonders_tab()

        for i in range(0, 1, 1):
            self.addressPageObj.verify_all_links_in_bonders_tab_works(count=i)
            time.sleep(2)

        self.logger.info("********Finished test case Test_007_Verify_bonders_tab_and_all_links...*******")
