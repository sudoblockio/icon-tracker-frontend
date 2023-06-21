import pytest

from e2e.page_objects.main_page import MainPage
from e2e.utilities.logger import LogGen
from e2e.config import config


class TestVerifyCardNumbersInMainPage:
    logger = LogGen.loggen()

    @pytest.mark.main_page
    def test_card_numbers_in_main_page(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.logger.info("********Starting test case Test_001_Verify_card_numbers_in_main_page...*******")
        self.mainPageObj.verify_main_page_card_numbers()
        self.logger.info("********Finished execution Test_001_Verify_card_numbers_in_main_page...*******")
