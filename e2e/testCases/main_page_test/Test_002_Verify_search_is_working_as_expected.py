import time

from e2e.pageObjects.MainPage import MainPage
from e2e.pageObjects.AddressPage import AddressPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class Test_002_Verify_search_is_working_as_expected:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    def test_001_verify_card_numbers_in_main_page(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_002_Verify_search_is_working_as_expected...*******")

        for i in range (1, 4, 1):

            query_one = ReadConfig.getQuery(i)
            self.mainPageObj.enter_query_in_search_bar(query=query_one)

            expected_url = ReadConfig.getExpectedUrl(i)
            self.addressPageObj.verify_user_in_address_page(url=expected_url)
            self.driver.get(self.baseurl)
            time.sleep(3)

        self.logger.info("********Finished test case Test_002_Verify_search_is_working_as_expected...*******")

