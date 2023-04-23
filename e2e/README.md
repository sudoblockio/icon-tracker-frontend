
## Commands 

```shell
# All 
pytest -v -s --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/
# Individual 
pytest -v -s -m "main_page and address_page" --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/
```

## Running on different networks 

To change the network, change the `config/config.ini` -> baseurl which modifies the window the tracker is running on. 
