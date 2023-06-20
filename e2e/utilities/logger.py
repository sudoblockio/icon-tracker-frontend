import logging
import os


class LogGen:
    @staticmethod
    def loggen():
        log_file = os.path.join(
            os.path.dirname(__file__), "../../e2e/logs/automation.log"
        )
        logging.basicConfig(
            filename=log_file,
            format='%(asctime)s: %(levelname)s: %(message)s',
            datefmt='%m/%d/%Y %I:%M:%S %p', force=True)

        logger = logging.getLogger()
        logger.setLevel(logging.INFO)
        return logger
