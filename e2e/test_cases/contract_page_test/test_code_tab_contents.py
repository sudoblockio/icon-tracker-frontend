import pytest

from e2e.page_objects.contract_page import ContractPage

from e2e.utilities.logger import LogGen
from e2e.utilities.read_properties import ReadConfig
from e2e.config import config


class TestVerifyCodeTabContents:
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_code_tab_contents(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_017_Verify_code_tab_contents"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())

        self.contractPageObj.click_code_tab()

        self.contractPageObj.verify_code_block_visible()

        self.logger.info("********Finished test case "
                         "Test_017_Verify_code_tab_contents"
                         "...*******")
