from fastapi import FastAPI
from api.router import router as api_router

app = FastAPI(title="Patient Coordinator API")

app.include_router(api_router)
