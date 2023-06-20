import time

import pytest

from e2e.page_objects.MainPage import MainPage
from e2e.page_objects.AddressPage import AddressPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifySearchIsWorkingAsExpected:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.main_page
    def test_card_numbers_in_main_page(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_002_Verify_search_is_working_as_expected...*******")

        for i in range(1, 4, 1):
            query_one = ReadConfig.getQuery(i)
            self.mainPageObj.enter_query_in_search_bar(query=query_one)

            expected_url = ReadConfig.getExpectedUrl(i)
            self.addressPageObj.verify_user_in_address_page(url=expected_url)
            self.driver.get(self.baseurl)
            time.sleep(3)

        self.logger.info("********Finished test case Test_002_Verify_search_is_working_as_expected...*******")
