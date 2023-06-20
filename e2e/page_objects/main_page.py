import time
from selenium.webdriver.common.keys import Keys
from e2e.utilities.logger import LogGen
from e2e.utilities.automation_utils import AutomationUtils
from selenium.webdriver.common.action_chains import ActionChains


class MainPage:
    logger = LogGen.loggen()

    number_cards_xpath = "//ul[@class='content']//li[%s]//div//p[2]"
    search_bar = '//*[@id="main-top-search-bar"]'

    def __init__(self, driver):
        self.driver = driver

    def verify_main_page_card_numbers(self):
        """Verify main page card contains numeric values or not."""
        pass_array = []
        try:
            AutomationUtils.wait_for_element_to_load(self, self.number_cards_xpath % '4')
            self.logger.info(">>verifying the numeric values in main page cards")
            for i in range(1, 5, 1):
                time.sleep(1)
                value = self.driver.find_element("xpath", self.number_cards_xpath % str(i)).text
                numeric_values = value.replace(",", "")

                if numeric_values.isnumeric():
                    pass_array.insert(i - 1, True)
                else:
                    AutomationUtils.log_error(self, 'verifying the numeric values in main page cards'
                                              , '_main_page_card_numeric_error.png')
                    assert False

            for val in pass_array:
                if val:
                    continue
                else:
                    AutomationUtils.log_error(self, 'verifying the numeric values in main page cards'
                                              , '_main_page_card_numeric_error.png')
                    assert False

            assert True

        finally:
            self.driver.quit()

    def enter_query_in_search_bar(self, query):
        """
        Enter query in a search bar.
        @param - query: search input needed to execute the search
        """
        try:
            self.logger.info(">>waiting for search bar to be visible")
            AutomationUtils.wait_for_element_to_load(self, self.search_bar)

            self.driver.find_element('xpath', self.search_bar).send_keys(query)
            self.logger.info(">>entered query in search bar")

            actions = ActionChains(self.driver)
            actions.send_keys(Keys.ENTER)
            actions.perform()
            self.logger.info(">>Search operation initiated")

        except:
            AutomationUtils.log_error(self, 'search bar is not visible'
                                      , 'search_bar_not_visible.png')
            assert False
