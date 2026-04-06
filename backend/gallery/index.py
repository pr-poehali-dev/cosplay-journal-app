"""
Галерея косплей-фотографий: получение списка и загрузка новых фото (только для админа).
"""
import json
import os
import base64
import uuid
import psycopg2
import boto3

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p54563436_cosplay_journal_app")
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
}


def get_db():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def check_admin(headers: dict) -> bool:
    token = headers.get("x-admin-token") or headers.get("X-Admin-Token", "")
    return token == os.environ.get("ADMIN_PASSWORD", "")


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    headers = event.get("headers") or {}

    # GET — список фотографий
    if method == "GET":
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, title, author, character_name, category, image_url, likes, created_at "
            f"FROM {SCHEMA}.cosplay_photos ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        conn.close()
        photos = [
            {
                "id": r[0],
                "title": r[1],
                "author": r[2],
                "character_name": r[3],
                "category": r[4],
                "image_url": r[5],
                "likes": r[6],
                "created_at": r[7].isoformat() if r[7] else None,
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"photos": photos})}

    # POST — загрузка нового фото (только админ)
    if method == "POST":
        if not check_admin(headers):
            return {"statusCode": 403, "headers": CORS, "body": json.dumps({"error": "Forbidden"})}

        body = json.loads(event.get("body") or "{}")
        title = body.get("title", "").strip()
        author = body.get("author", "").strip()
        character_name = body.get("character_name", "").strip()
        category = body.get("category", "КОСПЛЕЙ").strip()
        image_b64 = body.get("image_b64", "")
        image_ext = body.get("image_ext", "jpg").lower()

        if not title or not author or not image_b64:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "title, author и image_b64 обязательны"})}

        # Загружаем в S3
        image_data = base64.b64decode(image_b64)
        key = f"cosplay/{uuid.uuid4()}.{image_ext}"
        s3 = get_s3()
        content_type = f"image/{image_ext}" if image_ext != "jpg" else "image/jpeg"
        s3.put_object(Bucket="files", Key=key, Body=image_data, ContentType=content_type)
        image_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{key}"

        # Сохраняем в БД
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.cosplay_photos (title, author, character_name, category, image_url) "
            f"VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (title, author, character_name or None, category, image_url),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        return {"statusCode": 201, "headers": CORS, "body": json.dumps({"id": new_id, "image_url": image_url})}

    # DELETE — удаление фото (только админ)
    if method == "DELETE":
        if not check_admin(headers):
            return {"statusCode": 403, "headers": CORS, "body": json.dumps({"error": "Forbidden"})}

        params = event.get("queryStringParameters") or {}
        photo_id = params.get("id")
        if not photo_id:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Нужен параметр id"})}

        conn = get_db()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {SCHEMA}.cosplay_photos WHERE id = %s", (photo_id,))
        conn.commit()
        conn.close()

        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}

    return {"statusCode": 405, "headers": CORS, "body": json.dumps({"error": "Method not allowed"})}
