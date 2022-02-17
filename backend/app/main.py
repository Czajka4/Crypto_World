from fastapi import FastAPI, Depends
from starlette.requests import Request
import uvicorn

from app.api.routers.users import users_router
from app.api.routers.auth import auth_router
from app.api.routers.crypto import crypto_router
from app.core import config
from app.db.session import SessionLocal
from app.core.auth import get_current_active_user
from app.core.celery_app import celery_app
from app import tasks


app = FastAPI(title=config.PROJECT_NAME, docs_url="/api/docs", openapi_url="/api")


@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response


@app.get("/api/manage")
async def root():
    return {"message": "Api Route For Site Managing: Users, Password etc."}


@app.get("/api/manage/task")
async def example_task():
    celery_app.send_task("app.tasks.example_task", args=["Hello World"])
    return {"message": "success"}


# Routers
app.include_router(users_router, prefix="/api/manage", tags=["users"],
                   dependencies=[Depends(get_current_active_user)],)
app.include_router(auth_router, prefix="/api", tags=["auth"])
app.include_router(crypto_router, prefix="/api/crypto", tags=["crypto"])

if __name__ == "__main__":
    app_loc = str(config.UVICORN_APP_LOC)
    app_host = str(config.UVICORN_HOST)
    app_port = int(config.UVICORN_PORT)
    print(f"--- Uvicorn is starting in {app_loc} at {app_host}:{app_port}")
    uvicorn.run(app_loc, host=app_host,  reload=True, port=app_port)
