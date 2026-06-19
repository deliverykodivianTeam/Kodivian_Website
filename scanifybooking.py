

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv

import os
import uuid
import psycopg2
import psycopg2.extras
import requests


load_dotenv()

app = FastAPI(
    title="Scanify AI Requirement API",
    version="1.0.0"
)

# ------------------------------------------------------------------
# CORS
# ------------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------
# Environment Variables
# ------------------------------------------------------------------

DATABASE_URL = os.getenv("DATABASE_URL")
BREVO_API_KEY = os.getenv("BREVO_API_KEY")

if not DATABASE_URL:
    raise Exception("DATABASE_URL not found")

# ------------------------------------------------------------------
# Database
# ------------------------------------------------------------------

def get_db():
    return psycopg2.connect(DATABASE_URL)

def init_db():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS demo_bookings (
        id SERIAL PRIMARY KEY,

        booking_reference VARCHAR(100),

        full_name VARCHAR(255),
        designation VARCHAR(255),
        company_name VARCHAR(255),

        corporate_email VARCHAR(255),
        mobile_number VARCHAR(50),
                
                q1_current_process TEXT,
q2_document_volume VARCHAR(255),
q3_processing_time VARCHAR(255),
q4_errors TEXT,

q5_team_size VARCHAR(255),
q5_effort_per_document TEXT,

q6_erp_system VARCHAR(255),

q7_document_formats TEXT,

q8_pain_points TEXT,

q9_business_impact TEXT,

q10_automation_readiness VARCHAR(255),

q11_validation_process TEXT,

q13_erp_entry_method VARCHAR(255),

q14_mapping_template TEXT,

q15_approval_workflow VARCHAR(255), 

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    cur.close()
    conn.close()

@app.on_event("startup")
def startup_event():
    init_db()

# ------------------------------------------------------------------
# Request Model
# ------------------------------------------------------------------

class DemoBooking(BaseModel):

    full_name: str
    designation: Optional[str] = ""
    company_name: str
    corporate_email: str
    mobile_number: str

    q1_current_process: Optional[str] = ""
    q2_document_volume: Optional[str] = ""
    q3_processing_time: Optional[str] = ""
    q4_errors: Optional[str] = ""

    q5_team_size: Optional[str] = ""
    q5_effort_per_document: Optional[str] = ""

    q6_erp_system: Optional[str] = ""

    q7_document_formats: Optional[str] = ""

    q8_pain_points: Optional[str] = ""

    q9_business_impact: Optional[str] = ""

    q10_automation_readiness: Optional[str] = ""

    q11_validation_process: Optional[str] = ""

    q12_erp_entry_method: Optional[str] = ""

    q13_mapping_template: Optional[str] = ""

    q14_approval_workflow: Optional[str] = ""

# ------------------------------------------------------------------
# Brevo Configuration
# ------------------------------------------------------------------

SENDER_EMAIL = "preethi.jb@kodivian.com"
SENDER_NAME = "Kodivian Technologies"

INTERNAL_EMAILS = [
    "vijaysabari.m@kodivian.com",
    "preethi.jb@kodivian.com",
    "kaviya.arivaratharaj@kodivian.com"
]

# ------------------------------------------------------------------
# Email Helper
# ------------------------------------------------------------------

def send_email_brevo(
    to_email: str,
    to_name: str,
    subject: str,
    html_content: str
):
    if not BREVO_API_KEY:
        return False

    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
    }

    payload = {
        "sender": {
            "name": SENDER_NAME,
            "email": SENDER_EMAIL
        },
        "to": [
            {
                "email": to_email,
                "name": to_name
            }
        ],
        "subject": subject,
        "htmlContent": html_content
    }

    response = requests.post(
        url,
        json=payload,
        headers=headers
    )

    print("BREVO STATUS:", response.status_code)
    print("BREVO RESPONSE:", response.text)

    return response.status_code in [200, 201, 202]

# ------------------------------------------------------------------
# Internal Sales Notification
# ------------------------------------------------------------------

def send_internal_notification(
    booking: DemoBooking,
    booking_ref: str
):

    html_content = f"""
<html>
<body>

<h2>📌 New Scanify AI Requirement Submission</h2>

<p><b>Reference:</b> {booking_ref}</p>

<hr>

<h3>Contact Details</h3>

<p><b>Name:</b> {booking.full_name}</p>
<p><b>Designation:</b> {booking.designation}</p>
<p><b>Company:</b> {booking.company_name}</p>
<p><b>Email:</b> {booking.corporate_email}</p>
<p><b>Mobile:</b> {booking.mobile_number}</p>

<hr>

<h3>Requirement Details</h3>

<p><b>Q1:</b> {booking.q1_current_process}</p>
<p><b>Q2:</b> {booking.q2_document_volume}</p>
<p><b>Q3:</b> {booking.q3_processing_time}</p>
<p><b>Q4:</b> {booking.q4_errors}</p>
<p><b>Q5 Team Size:</b> {booking.q5_team_size}</p>
<p><b>Q5 Effort:</b> {booking.q5_effort_per_document}</p>
<p><b>Q6 ERP:</b> {booking.q6_erp_system}</p>
<p><b>Q7 Formats:</b> {booking.q7_document_formats}</p>
<p><b>Q8 Pain Points:</b> {booking.q8_pain_points}</p>
<p><b>Q9 Business Impact:</b> {booking.q9_business_impact}</p>
<p><b>Q10 Automation:</b> {booking.q10_automation_readiness}</p>
<p><b>Q11 Validation:</b> {booking.q11_validation_process}</p>
<p><b>Q12 ERP Entry:</b> {booking.q12_erp_entry_method}</p>
<p><b>Q13 Mapping:</b> {booking.q13_mapping_template}</p>
<p><b>Q14 Workflow:</b> {booking.q14_approval_workflow}</p>

</body>
</html>
"""


    for email in INTERNAL_EMAILS:
        send_email_brevo(
            email,
            "Sales Team",
            f"New Scanify AI Requirement Submission - {booking_ref}",
            html_content
        )


# ------------------------------------------------------------------
# Customer Acknowledgement Email
# ------------------------------------------------------------------

def send_customer_acknowledgement(
    booking: DemoBooking,
    booking_ref: str
):

    html_content = f"""
<html>
<body>

<h2>Thank You for Your Interest in Scanify AI</h2>

<p>Dear {booking.full_name},</p>

<p>
Thank you for sharing your requirement details with us.
Your submission has been successfully received by our team.
</p>

<p>
Our solution consultants will review your requirements and
reach out to you shortly to understand your process in detail
and schedule a personalized Scanify AI product demonstration.
</p>

<table border="1" cellpadding="8" cellspacing="0">

<tr>
<td><b>Reference Number</b></td>
<td>{booking_ref}</td>
</tr>

<tr>
<td><b>Company Name</b></td>
<td>{booking.company_name}</td>
</tr>

<tr>
<td><b>Contact Person</b></td>
<td>{booking.full_name}</td>
</tr>

<tr>
<td><b>Email</b></td>
<td>{booking.corporate_email}</td>
</tr>

<tr>
<td><b>Mobile Number</b></td>
<td>{booking.mobile_number}</td>
</tr>

</table>

<br>

<p>
We appreciate the opportunity to support your document automation journey.
</p>

<p>
Regards,<br>
Scanify AI Team<br>
Kodivian Technologies
</p>

</body>
</html>
"""
    

    send_email_brevo(
        booking.corporate_email,
        booking.full_name,
        "Thank You for Your Interest in Scanify AI",
        html_content
    )

# ------------------------------------------------------------------
# Create Booking API
# ------------------------------------------------------------------
@app.post("/api/book-demo")
def book_demo(booking: DemoBooking):

    booking_ref = f"SCAN-{uuid.uuid4().hex[:8].upper()}"

    try:

        conn = get_db()
        cur = conn.cursor()


        # Insert booking
        cur.execute(
            """
            INSERT INTO demo_bookings
            (
              booking_reference,
full_name,
designation,
company_name,
corporate_email,
mobile_number,

q1_current_process,
q2_document_volume,
q3_processing_time,
q4_errors,

q5_team_size,
q5_effort_per_document,

q6_erp_system,

q7_document_formats,

q8_pain_points,

q9_business_impact,

q10_automation_readiness,

q11_validation_process,

q12_erp_entry_method,

q13_mapping_template,

q14_approval_workflow
            )
            VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,
(
    booking_ref,
    booking.full_name,
    booking.designation,
    booking.company_name,
    booking.corporate_email,
    booking.mobile_number,

    booking.q1_current_process,
    booking.q2_document_volume,
    booking.q3_processing_time,
    booking.q4_errors,

    booking.q5_team_size,
    booking.q5_effort_per_document,

    booking.q6_erp_system,

    booking.q7_document_formats,

    booking.q8_pain_points,

    booking.q9_business_impact,

    booking.q10_automation_readiness,

    booking.q11_validation_process,

    booking.q12_erp_entry_method,

    booking.q13_mapping_template,

    booking.q14_approval_workflow
)
        )

        conn.commit()

        cur.close()
        conn.close()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    try:
        send_internal_notification(
            booking,
            booking_ref
            
        )

        send_customer_acknowledgement(
            booking,
            booking_ref
        )

    except Exception as e:
        print("Email Error:", e)

    return {
        "success": True,
        "booking_reference": booking_ref
    }
# ------------------------------------------------------------------
# Get All Bookings
# ------------------------------------------------------------------

@app.get("/api/bookings")
def get_bookings():

    try:

        conn = get_db()

        cur = conn.cursor(
            cursor_factory=psycopg2.extras.DictCursor
        )

        cur.execute("""
            SELECT *
            FROM demo_bookings
            ORDER BY created_at DESC
        """)

        rows = cur.fetchall()

        bookings = []

        for row in rows:

            item = dict(row)

            if item.get("created_at"):
                item["created_at"] = item[
                    "created_at"
                ].isoformat()

            bookings.append(item)

        cur.close()
        conn.close()

        return bookings

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# ------------------------------------------------------------------
# Get Booking By Reference
# ------------------------------------------------------------------

@app.get("/api/booking/{booking_reference}")
def get_booking(booking_reference: str):

    try:

        conn = get_db()

        cur = conn.cursor(
            cursor_factory=psycopg2.extras.DictCursor
        )

        cur.execute(
            """
            SELECT *
            FROM demo_bookings
            WHERE booking_reference = %s
            """,
            (booking_reference,)
        )

        row = cur.fetchone()

        cur.close()
        conn.close()

        if not row:
            raise HTTPException(
                status_code=404,
                detail="Booking not found"
            )

        result = dict(row)

        if result.get("created_at"):
            result["created_at"] = result[
                "created_at"
            ].isoformat()

        return result

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# ------------------------------------------------------------------
# Health API
# ------------------------------------------------------------------

@app.get("/")
def root():

    return {
        "status": "running",
        "application": "Scanify AI Requirement API",
        "version": "1.0.0"
    }

@app.get("/api/health")
def health():

    try:

        conn = get_db()

        cur = conn.cursor()

        cur.execute("SELECT 1")

        cur.fetchone()

        cur.close()
        conn.close()

        return {
            "status": "ok",
            "database": "connected"
        }

    except Exception as e:

        return {
            "status": "error",
            "database": str(e)
        }

# ------------------------------------------------------------------
# Dashboard Summary
# ------------------------------------------------------------------

@app.get("/api/dashboard")
def dashboard():

    try:

        conn = get_db()

        cur = conn.cursor()

        cur.execute(
            """
            SELECT COUNT(*)
            FROM demo_bookings
            """
        )

        total_bookings = cur.fetchone()[0]

        cur.execute(
            """
            SELECT COUNT(*)
            FROM demo_bookings
            """
        )

        demo_requests = cur.fetchone()[0]

        cur.close()
        conn.close()

        return {
            "total_bookings": total_bookings,
            "demo_requests": demo_requests
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# ------------------------------------------------------------------
# Run Local
# ------------------------------------------------------------------

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )