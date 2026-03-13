from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from api.transport_router import router as transport_router
from api.user_router import router as user_router

app = FastAPI(
    title="Patient Coordinator API",
    description="tbd. (uses markdown)",
    version="0.0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # TODO: Add address of web frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transport_router)
app.include_router(user_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Patient Coordinator API"}
