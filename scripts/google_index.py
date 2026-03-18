import os
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Load credentials from environment variable
credentials_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
if not credentials_json:
    raise ValueError("GOOGLE_APPLICATION_CREDENTIALS secret not found!")

creds_dict = json.loads(credentials_json)
creds = service_account.Credentials.from_service_account_info(
    creds_dict,
    scopes=["https://www.googleapis.com/auth/indexing"]
)

service = build("indexing", "v3", credentials=creds)

urls = [
    "https://electricitycrisis.github.io/"
]

for url in urls:
    body = {"url": url, "type": "URL_UPDATED"}
    response = service.urlNotifications().publish(body=body).execute()
    print(response)