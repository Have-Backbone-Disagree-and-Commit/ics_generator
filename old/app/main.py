from fastapi import FastAPI
from .routers import generateRouter

app = FastAPI()
app.include_router(generateRouter.router)