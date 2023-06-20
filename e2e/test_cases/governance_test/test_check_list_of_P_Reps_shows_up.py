import pytest

from e2e.page_objects.GovernancePage import GovernancePage
from e2e.page_objects.MainPage import MainPage
from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyCheckListOfPRepsShowsUp:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.governance
    def test_check_list_of_P_Reps_shows_up(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.governancePageObj = GovernancePage(self.driver)
        self.logger.info("********Starting test case Test_022_Verify_check_list_of_P_Reps_shows_up...*******")
        self.governancePageObj.hover_governance_tab()
        self.governancePageObj.click_on_p_rep_cta()
        self.governancePageObj.verify_p_rep_table_exist()
        self.logger.info("********Finished execution Test_022_Verify_check_list_of_P_Reps_shows_up...*******")
