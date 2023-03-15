import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from e2e.utilities.Logger import LogGen


class AutomationUtils:
    logger = LogGen.loggen()

    def __init__(self, driver):
        self.driver = driver

    @staticmethod
    def wait_for_element_to_load(self, xpath):
        self.logger.info(">>waiting for element to be visible")
        element = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )

    @staticmethod
    def log_error(self, error, screenshot_name):
        self.logger.info(">>"+error)
        self.driver.save_screenshot('./e2e/screenshots/' + screenshot_name)

