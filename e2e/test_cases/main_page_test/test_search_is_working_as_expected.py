import time
import pytest

from e2e.page_objects.main_page import MainPage
from e2e.page_objects.address_page import AddressPage
from e2e.utilities.logger import LogGen
from e2e.utilities.read_properties import ReadConfig
from e2e.config import config


class TestVerifySearchIsWorkingAsExpected:
    logger = LogGen.loggen()

    @pytest.mark.main_page
    def test_card_numbers_in_main_page(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_002_Verify_search_is_working_as_expected...*******")

        for i in range(1, 4, 1):
            query_one = ReadConfig.getQuery(i)
            self.mainPageObj.enter_query_in_search_bar(query=query_one)

            expected_url = ReadConfig.getExpectedUrl(i)
            self.addressPageObj.verify_user_in_address_page(url=expected_url)
            self.driver.get(config.base_url)
            time.sleep(3)

        self.logger.info("********Finished test case Test_002_Verify_search_is_working_as_expected...*******")
