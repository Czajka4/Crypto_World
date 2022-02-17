import pandas as pd
import numpy as np
import time
from datetime import datetime, timedelta

from statsmodels.tsa.arima.model import ARIMA


def format_data_frame(df):
    df = df.rename(columns={"timestamp": "date"})
    df = df.drop(df.columns.difference(['date','price']), 1)

    df.price = df.price.astype(float)

    df.date = pd.to_datetime(df.date, unit='s')
    df.date = df.date.dt.strftime('%Y-%m-%d')

    df = df.set_index('date')
    df.index = pd.DatetimeIndex(df.index).to_period('D')
    df.index = df.index.to_timestamp()
    df = df[~df.index.duplicated()]
    df = df.reindex(pd.date_range(start=df.index.min(), end=df.index.max(), freq='W-FRI'))
    
    return df


# format date for yahoo finances api
def format_date(date_datetime):
    date_timetuple = date_datetime.timetuple()
    date_mktime = time.mktime(date_timetuple)
    date_int = int(date_mktime)
    date_str = str(date_int)
    return date_str
 

def calculate_arima(df):    
    df_fill = df.asfreq('W', method='ffill')
    df_returns = df_fill.diff()
    df_returns.iloc[0] = 0

    #Build the model and fit it to the data
    model = ARIMA(df_returns, order=[1,0,1])
    fitted_model = model.fit()

    start = df.iloc[[-1]].index
    end = start + timedelta(weeks=10)

    start = pd.to_datetime(str(start.values[0]))
    end =  pd.to_datetime(str(end.values[0]))

    start_date = start.strftime('%Y.%m.%d')
    end_date = end.strftime('%Y.%m.%d')

    preds = fitted_model.predict(start=start_date,end=end_date)
    dfp = pd.DataFrame(preds)
    dfp = dfp.rename(columns={"predicted_mean": "price"})

    last_v = df_fill.price.iloc[-1]
    for n, x in enumerate(dfp.price.iloc[:]):
        if n < 1:
            dfp.price[n] = last_v + x
        else:
            dfp.price[n] = dfp.price.iloc[n-1] + dfp.price.iloc[n]

    df_fill.price = df_fill.price.fillna(0)
    dfp.price = dfp.price.fillna(0)

    for n, x in enumerate(df_fill.price.iloc[:]):
        if n < 1:
            if x < 0.0001:
                df_fill.price[n] = df_fill.price[n+1]
        else:
             if x < 0.0001:
                df_fill.price[n] = df_fill.price[n-1]

    return df_fill, dfp




