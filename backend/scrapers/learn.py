from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

items = []
class Item(BaseModel):
    text: str = ""
    is_done: bool = False


@app.get("/")
def read_root():
    return {
        "message": "Hello World"
        }

@app.post("/items")
def create_item(item: Item):
    items.append(item)
    return items

@app.get("/items")
def list_items(limit: int = 10):
    return items[:limit]

@app.get("/items/{item_id}")
def get_items(item_id: int) -> str:
    if item_id >= len(items):
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]