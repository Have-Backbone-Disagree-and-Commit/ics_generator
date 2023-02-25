from fastapi import APIRouter
router = APIRouter()

@router.post("/send_data", tags=["slack"])
async def send_data(data : dict):
    try:
        for key, value in data.items():
            res = es.index(index="crawl_database", body=value)
            print(res)
        return res
    except Exception as e:
        return 

@router.get("/get_test/{id}", tags=["slack"])
async def get_test(id: int):
    return id

