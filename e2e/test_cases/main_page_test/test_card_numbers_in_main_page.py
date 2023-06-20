import pytest

from e2e.page_objects.MainPage import MainPage
from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyCardNumbersInMainPage:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.main_page
    def test_card_numbers_in_main_page(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.logger.info("********Starting test case Test_001_Verify_card_numbers_in_main_page...*******")
        self.mainPageObj.verify_main_page_card_numbers()
        self.logger.info("********Finished execution Test_001_Verify_card_numbers_in_main_page...*******")
