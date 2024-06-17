from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from app.schemas.base import BaseSchema
from langchain_community.document_loaders import WebBaseLoader


# Configure logging
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/playground", tags=["playground"])

class UrlModel(BaseSchema):
    url: str

@router.post("/get")
async def get_from_url(item: UrlModel):
    url = item.url

    logger.info(f"Received request to scrape URL: {item}")

    try:
        # Log the received URL for debugging
        logger.info(f"Received URL: {url}")

        loader = WebBaseLoader(url)
        document = loader.load()

        logger.info(f"Document: {document}")
        return {"content":document}
    except Exception as e:
        logger.error(f"Error in get_vectorstore_from_url: {e}")
        raise HTTPException(status_code=500, detail=str(e))