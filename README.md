### CryptoWrold Dashboard

> ReactJS ANTD Dashboard with informatiom about cryptocurrencies

--- 
Configuration : Set API hosts, and keys for RapidAPI, db (postgre) password etc.

    nginx/ngin.config
    .env*

---
First run:

    chmod +x first_build.sh
    .\first_build.sh

Build all images, migrate databasese, init data for superuser

---
Shutdown

    docker-compose down

---

Build (only changes) and run:

    chmod +x build.sh
    .\build.sh

---

