#/usr/bin/env python3

import geopandas as gpd
import pandas as pd
import numpy as np

from taskmgr_api import taskmgr_api

##
## Variables
##

api_url = "https://tasks.hotosm.org/api/v1/project/5670/aoi?as_file=false"

paths = {
    "tasks_list": "../_data/tasks_list.csv",
    "out_tasks_geojson": "../assets/data/tasks.geojson",
}

##
## Script
##

api = taskmgr_api()
tasks = pd.read_csv(paths["tasks_list"],
                    dtype={'task_id': np.int32,
                           'display': np.str})

## loop thru task ids
for t_id, task in tasks.iterrows():
    print(task["task_id"])
