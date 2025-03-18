from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient
from .config import MONGODB_URL, DB_NAME
from .routes import user, entry

app = FastAPI(title="Budget App API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, replace with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    return app.mongodb

# connection
@app.on_event("startup")
async def startup_db_client():
    try:
        app.mongodb_client = AsyncIOMotorClient(MONGODB_URL)

        await app.mongodb_client.admin.command('ping')
        print("Successfully connected to MongoDB Atlas!")
        
        app.mongodb = app.mongodb_client[DB_NAME]
        
        await app.mongodb["users"].create_index("username", unique=True)
        await app.mongodb["entries"].create_index([("username", 1), ("date", -1)])
    except Exception as e:
        print(f"Error connecting to MongoDB Atlas: {e}")
        raise

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

#routers
app.include_router(user.router, tags=["users"], prefix="/user", dependencies=[Depends(get_db)])
app.include_router(entry.router, tags=["entries"], dependencies=[Depends(get_db)])

@app.get("/")
async def root():
    return {"message": "Welcome to Budget App API"}