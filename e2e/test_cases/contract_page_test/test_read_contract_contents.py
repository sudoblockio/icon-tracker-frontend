
import pytest

from e2e.page_objects.contract_page import ContractPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyReadContractContents:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_read_contract_contents(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_018_Verify_read_contract_contents"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())

        self.contractPageObj.click_read_contract_tab()

        self.contractPageObj.verify_list_present_in_read_contract_tab()

        self.logger.info("********Finished test case "
                         "Test_018_Verify_read_contract_contents"
                         "...*******")
