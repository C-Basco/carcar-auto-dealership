import django
import os
import sys
import time
import json
import requests
from service_rest.models import AutomobileVO

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()


def poll(repeat=True):
    while True:
        print('Service poller polling for xxxx data')
        try:
            url = 'http://project-beta-inventory-api-1:8000/api/automobiles'
            response = requests.get(url)
            content = json.loads(response.content)
            for auto in content["autos"]:
                AutomobileVO.objects.update_or_create(
                    vin=auto["vin"],
                    defaults={"vin": auto["vin"]}
                )
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
