from selenium.webdriver import ActionChains

from e2e.utilities.AutomationUtils import AutomationUtils
from e2e.utilities.Logger import LogGen


class GovernancePage:
    logger = LogGen.loggen()

    governance_tab_cta = "(//span[contains(text(),'Governance')])[1]"
    governance_p_rep_cta = "(//span[contains(text(),'P-Rep List')])[1]"
    governance_p_rep_table = "//td[@class='bonded']"

    def __init__(self, driver):
        self.driver = driver

    def hover_governance_tab(self):
        a = ActionChains(self.driver)
        self.logger.info(">>waiting for governance tab to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.governance_tab_cta)
        m = self.driver.find_element('xpath', self.governance_tab_cta)
        a.move_to_element(m).perform()

    def click_on_p_rep_cta(self):
        self.logger.info(">>waiting for p-rep to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.governance_p_rep_cta)
        self.driver.find_element('xpath', self.governance_p_rep_cta).click()

    def verify_p_rep_table_exist(self):
        self.logger.info(">>waiting for table to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.governance_p_rep_table)
        elements = self.driver.find_elements("xpath", self.governance_p_rep_table)
        if len(elements) > 0:
            assert True
        else:
            AutomationUtils.log_error(self, 'P-rep table list did not load'
                                      , 'p_rep_list_did_not_load.png')
            assert False
