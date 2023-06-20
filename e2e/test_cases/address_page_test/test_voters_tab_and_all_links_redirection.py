import pytest

from e2e.page_objects.MainPage import MainPage
from e2e.page_objects.AddressPage import AddressPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyVotersTabAndAllLinksRedirection:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()
    verifyUrl = "https://tracker.icon.community/addressvoters/hx0b047c751658f7ce1b2595da34d57a0e7dad357d"

    @pytest.mark.address_page
    def test_voters_tab_and_all_links_redirection(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_005_Verify_voters_tab_and_all_links_redirection...*******")
        self.driver.get(ReadConfig.getExpectedUrl(1))

        self.addressPageObj.click_on_voters_tab()

        for i in range(0, 10, 1):
            self.addressPageObj.verify_all_links_in_voters_tab_works(count=i)

            self.addressPageObj.click_total_transaction_count()

            self.addressPageObj.verify_transaction_detail_page(title="Voters")

            self.addressPageObj.verify_transaction_detail_page_url(url=self.verifyUrl)
        self.logger.info("********Finished test case Test_005_Verify_voters_tab_and_all_links_redirection...*******")

