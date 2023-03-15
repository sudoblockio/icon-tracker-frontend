import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from e2e.utilities.Logger import LogGen
from e2e.utilities.AutomationUtils import AutomationUtils


class MainPage:
    logger = LogGen.loggen()

    number_cards_xpath = "//ul[@class='content']//li[%s]//div//p[2]"

    def __init__(self, driver):
        self.driver = driver

    def verify_main_page_card_numbers(self):

        pass_array = []
        try:
            AutomationUtils.wait_for_element_to_load(self, self.number_cards_xpath % '4')
            self.logger.info(">>verifying the numeric values in main page cards")
            for i in range(1, 5, 1):
                time.sleep(1)
                value = self.driver.find_element("xpath", self.number_cards_xpath % str(i)).text
                numeric_values = value.replace(",", "")

                if numeric_values.isnumeric():
                    pass_array.insert(i-1, True)
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
