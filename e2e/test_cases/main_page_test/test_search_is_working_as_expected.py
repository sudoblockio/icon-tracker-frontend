import time
import pytest

from e2e.page_objects.main_page import MainPage
from e2e.page_objects.address_page import AddressPage
from e2e.utilities.logger import LogGen
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

        cases = [
            {
                'query': 'hx0b047c751658f7ce1b2595da34d57a0e7dad357d',
                'expected_path': '/address/hx0b047c751658f7ce1b2595da34d57a0e7dad357d'
            },
            {
                'query': '0xb2b21b7be3f0a5d5a047866a48eb4b6af0d0f29fd48d9d7ba024f92a584e4ff3',
                'expected_path': '/transaction/0xb2b21b7be3f0a5d5a047866a48eb4b6af0d0f29fd48d9d7ba024f92a584e4ff3'
            },
            {
                'query': '100',
                'expected_path': '/block/100'
            },
        ]

        for i in cases:

            self.mainPageObj.enter_query_in_search_bar(query=i['query'])

            self.addressPageObj.verify_user_in_address_page(
                url=config.base_url + i['expected_path'],
            )
            self.driver.get(config.base_url)
            time.sleep(config.default_sleep)

        self.logger.info("********Finished test case Test_002_Verify_search_is_working_as_expected...*******")
