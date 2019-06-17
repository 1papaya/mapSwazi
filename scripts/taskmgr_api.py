#/usr/bin/env python3

import requests

class taskmgr_api:
    def __init__(self):
        ## TODO add logging
        ## TODO handle errors, etc

        self.base_url = "https://tasks.hotosm.org/api/v1"

        self.default_headers = {
            "Accept": "application/json",
            "Accept-Language": "en"
        }

        self.queries = {
            "project": {
                "endpoint": "project/{project_id}",
                "params": {
                    "as_file": "false",
                    "abbreviated": "false"
                }
            },
            "project_aoi": {
                "endpoint": "project/{project_id}/aoi",
                "params": {
                    "as_file": "false"
                }
            },
            "project_summary": {
                "endpoint": "project/{project_id}/summary"
            }
        }

        pass

    def send_req(self, endpoint, params, **kwargs):
        ## join parameter string together
        param_str = "&".join(["{}={}".format(k,v) for k,v in params.items()])

        return "{base_url}/{endpoint}?{params}".format(**{
            "base_url": self.base_url,
            "endpoint": endpoint.format(**kwargs),
            "params": param_str
        })

    def query(self, q_type, headers={}, params={}, **kwargs):

        query = self.queries[q_type]
        query_url = "{}/{}".format(self.base_url, query["endpoint"].format(**kwargs))

        ## use default headers & parameters for request
        headers = {**self.default_headers, **headers}
        params = {**query["params"], **params} if "params" in query else params

        req = requests.get(query_url, params=params, headers=headers)
        return req.json()
