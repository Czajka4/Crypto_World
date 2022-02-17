from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import typing as t

from app.core.crypto_api import (
    query_for_crypto,
    query_single_coin,
    query_coin_history,
    query_crypto_news,
    query_crypto_prediction)

from app.core.auth import get_current_active_user
from app.db.session import get_db


crypto_router = r = APIRouter()


@r.get("/cryptoinfo/")
async def root(
    limit: t.Optional[int] = 50,
):
    data = query_for_crypto(limit)
    return data

@r.get("/cryptodetail/{coin_id}")
async def root(
    coin_id: str = 'yhjMzLPhuIDl' 
):
    data = query_single_coin(coin_id)
    return data

@r.get("/cryptodetail/{coin_id}")
async def root(
    coin_id: str
):
    data = query_single_coin(coin_id)
    return data

@r.get("/cryptohistory/{coin_id}/history/{timeperiod}")
async def root(
    coin_id: str ,
    timeperiod: str
):
    # BT id = Qwsogvtv82FCd
    data = query_coin_history(coin_id, timeperiod, 'json')
    return data

@r.get("/cryptonews/{category}/count/{count}")
async def root(
    category: str ,
    count: int
):
    # Category = 'Cryptocurency'
    # Cunt = 3 or 15
    data = query_crypto_news(category, count)
    return data


@r.get("/cryptopredict/{coin_id}/")
async def root(
    coin_id: str ,
):
    print(f'---------------- {coin_id}')
    data = query_crypto_prediction(coin_id)
    print(f' \n  {data} \n ')
    return data
