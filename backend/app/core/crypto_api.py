import requests
import json
import time
from datetime import datetime

import pandas as pd
import numpy as np

from app.core import config
from app.core import arima_model as am


HEADERS = {
    'x-rapidapi-host': config.API_CRYPTO_RAPIDAPI_HOST,
    'x-rapidapi-key': config.API_CRYPTO_RAPIDAPI_KEY
    }

BASE_URL = config.API_CRYPTO_RAPIDAPI_URL


def query_for_crypto(limit):
    querystring = {"referenceCurrencyUuid": "yhjMzLPhuIDl",
                   "timePeriod": "24h",
                   "tiers": "1",
                   "orderBy": "marketCap",
                   "orderDirection": "desc",
                   "limit": str(limit),
                   "offset": "0"}

    endpoint = "/coins"
    url = BASE_URL + endpoint
    response = requests.request("GET", url, headers=HEADERS, params=querystring)

    return response.json() 


def query_single_coin(coin_id):
    endpoint = "/coin/" + coin_id
    url = BASE_URL + endpoint
    response = requests.request("GET", url, headers=HEADERS)

    return response.json() 
    

def query_coin_history(coin_id, timeperiod, response_type):
    currency_reference = "yhjMzLPhuIDl"   # US Dollar (USD)
    
    querystring = {"referenceCurrencyUuid": currency_reference,
                   "timePeriod": timeperiod}
    
    endpoint = "/coin/" + coin_id + "/history"
    url = BASE_URL + endpoint
    
    response = requests.request("GET", url, headers=HEADERS, params=querystring)

    if response_type == 'json':
        return response.json()
    elif response_type == 'text':
        return response.text
    else:
        return response
    
    
def query_crypto_news(category, count):
    news_header = {'x-bingapis-sdk': 'true',
                   'x-rapidapi-host': config.API_CRYPTO_BING_HOST,
                   'x-rapidapi-key': config.API_CRYPTO_BING_KEY}

    bese_url = config.API_CRYPTO_BING_URL
    endpoint = '/news/search'
    url = bese_url + endpoint
    
    querystring = {"q": category,
                   "count": count,
                   "safeSearch": "Off",
                   "textFormat": "Raw",
                   "freshness": "Week"}

    response = requests.request("GET", url, headers=news_header, params=querystring)

    return response.json()


def query_crypto_prediction(coin_id):
    prediction_period = '1y'
    
    data = query_coin_history(coin_id, prediction_period, 'text')

    json_data = json.loads(data)
    json_data = json_data['data']
    json_data = json_data['history']
    
    history_data = pd.DataFrame(json_data)
    data_df = am.format_data_frame(history_data)
    old_val, predict_val = am.calculate_arima(data_df)

    old_date = np.array(pd.to_datetime(old_val.index.values).strftime('%Y.%m.%d'))
    old_price = np.array(old_val.price.iloc[:])
    new_date = np.array(pd.to_datetime(predict_val.index.values).strftime('%Y.%m.%d'))
    new_price = np.array(predict_val.price.iloc[:])
        
    for n, date_str in enumerate(old_date):
        old_date[n] = (int(time.mktime(datetime.strptime(date_str,'%Y.%m.%d').timetuple())))
    for n, date_str in enumerate(new_date):
        new_date[n] = (int(time.mktime(datetime.strptime(date_str,'%Y.%m.%d').timetuple())))

    final_data = {'old': {
                    'price': old_price.tolist(),
                    'timestamp': old_date.tolist()},
                  'new': {
                    'price': new_price.tolist(),
                    'timestamp': new_date.tolist()}}
                     
    return final_data