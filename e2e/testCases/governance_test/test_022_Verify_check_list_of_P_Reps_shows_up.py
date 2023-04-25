import pytest

from e2e.pageObjects.GovernancePage import GovernancePage
from e2e.pageObjects.MainPage import MainPage
from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class Test_022_Verify_check_list_of_P_Reps_shows_up:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.governance
    @pytest.mark.standalone
    def test_022_Verify_check_list_of_P_Reps_shows_up(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.governancePageObj = GovernancePage(self.driver)
        self.logger.info("********Starting test case Test_022_Verify_check_list_of_P_Reps_shows_up...*******")
        self.governancePageObj.hover_governance_tab()
        self.governancePageObj.click_on_p_rep_cta()
        self.governancePageObj.verify_p_rep_table_exist()
        self.logger.info("********Finished execution Test_022_Verify_check_list_of_P_Reps_shows_up...*******")
