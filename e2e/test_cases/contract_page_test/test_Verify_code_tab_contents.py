
import pytest

from e2e.page_objects.ContractPage import ContractPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyCodeTabContents:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_017_Verify_code_tab_contents(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
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
