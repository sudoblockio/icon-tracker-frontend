from tests.pageObjects.MainPage import MainPage
from tests.utilities.Logger import LogGen
from tests.utilities.ReadProperties import ReadConfig


class Test_001_Verify_card_numbers_in_main_page:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    def test_001_verify_card_numbers_in_main_page(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.logger.info("********Starting test case Test_001_Verify_card_numbers_in_main_page...*******")
        self.mainPageObj.verify_main_page_card_numbers()
        self.logger.info("********Finished execution Test_001_Verify_card_numbers_in_main_page...*******")
