#!/usr/bin/env python3

import os
from app.db.session import get_db
from app.db.crud import create_user
from app.db.schemas import UserCreate
from app.db.session import SessionLocal


def init() -> None:
    db = SessionLocal()

    create_user(
        db,
        UserCreate( # os.getenv()
            email=os.getenv('SUPERUSER_EMAIL'),
            password=os.getenv('SUPERUSER_PASS'),
            is_active=True,
            is_superuser=True,
        ),
    )


if __name__ == "__main__":
    init()
    print("initial_data.py:  Superuser created")
