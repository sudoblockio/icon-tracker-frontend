rem python -m pytest -v -m "main_page" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/main_page_test
rem python -m pytest -v -s -m "address_page" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/address_page_test
rem pytest -v -s -m "main_page and address_page" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/
rem pytest -v -s -m "main_page or address_page" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/
rem python -m pytest -v -s --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/address_page_test/Test_008_Verify_new_address_url_transaction_tab.py --browser chrome
python -m pytest -v -s -m "standalone" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases --disable-warnings
