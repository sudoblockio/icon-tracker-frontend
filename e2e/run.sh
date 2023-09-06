# python -m pytest -v -m "main_page" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/main_page_test
python -m pytest -v -s -m "governance" --html=e2e/reports/report.html --capture=tee-sys e2e/test_cases/governance_test
# pytest -v -s -m "main_page and address_page" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/
# pytest -v -s -m "main_page or address_page" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/
# python -m pytest -v -s --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/address_page_test/Test_008_Verify_new_address_url_transaction_tab.py --browser chrome
# python -m pytest -v -s -m "standalone" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases --disable-warnings
# pytest -v -s -m "main_page and address_page and contract_page and governance" --html=e2e/reports/report.html --capture=tee-sys e2e/test_cases/
