from fastapi import FastAPI

from api.transports_router import router as api_router

app = FastAPI(title="Patient Coordinator API")

app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Patient Coordinator API"}
