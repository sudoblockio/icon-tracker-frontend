from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from e2e.utilities.logger import LogGen
from e2e.config import config


class AutomationUtils:
    logger = LogGen.loggen()

    def __init__(self, driver):
        self.driver = driver

    @staticmethod
    def wait_for_element_to_load(self, xpath):
        self.logger.info(">>waiting for element to be visible")
        WebDriverWait(self.driver, config.default_timeout).until(
            EC.presence_of_element_located((By.XPATH, xpath))
        )

    @staticmethod
    def wait_for_element_to_load_from_element(self, element):
        self.logger.info(">>waiting for element to be visible")
        WebDriverWait(self.driver, config.default_timeout).until(
            EC.presence_of_element_located(element)
        )

    @staticmethod
    def log_error(self, error, screenshot_name):
        self.logger.info(">>" + error)
        self.driver.save_screenshot('./e2e/screenshots/' + screenshot_name)
