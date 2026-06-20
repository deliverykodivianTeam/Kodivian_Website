

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
    q1_other TEXT,

    q2_document_volume TEXT,
    q3_processing_time TEXT,
    q4_errors TEXT,

    q5_team_size TEXT,
    q5_effort_per_document TEXT,

    q6_erp_system TEXT,
    q6_other TEXT,

    q7_document_formats TEXT,
    q7_other TEXT,

    q8_pain_points TEXT,

    q9_business_impact TEXT,
    q9_other TEXT,

    q10_automation_readiness TEXT,
    q10_other TEXT,

    q11_validation_process TEXT,

    q12_erp_entry_method TEXT,
    q12_other TEXT,

    q13_mapping_template TEXT,

    q14_approval_workflow TEXT,
    q14_other TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
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

    q1_other: Optional[str] = ""
    q6_other: Optional[str] = ""
    q7_other: Optional[str] = ""
    q9_other: Optional[str] = ""
    q10_other: Optional[str] = ""
    q12_other: Optional[str] = ""
    q14_other: Optional[str] = ""
# ------------------------------------------------------------------
# Brevo Configuration
# ------------------------------------------------------------------

SENDER_EMAIL = "preethi.jb@kodivian.com"
SENDER_NAME = "Kodivian Technologies"

INTERNAL_EMAILS = [
    "vijaysabari.m@kodivian.com",
    "preethi.jb@kodivian.com",
    "kaviya.arivaratharaj@kodivian.com",
    "manoranjan.ks@kodivian.com"
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

<p><b>1. How are you currently processing documents like invoices, POs, or GRNs?</b><br />{booking.q1_current_process}</p>

<p><b>2. What is your average monthly document volume?</b><br />{booking.q2_document_volume}</p>

<p><b>3. How much time does it currently take to process a document?</b><br />{booking.q3_processing_time}</p>

<p><b>4. What is your estimated error rate in document processing?</b><br />{booking.q4_errors}</p>

<p><b>5. How many team members are involved in document processing?</b><br />{booking.q5_team_size}</p>

<p><b>5.1 How much effort is spent per document?</b><br />{booking.q5_effort_per_document}</p>

<p><b>6. Which ERP or accounting system are you currently using?</b><br />{booking.q6_erp_system}</p>

<p><b>7. What formats do your documents come in?</b><br />{booking.q7_document_formats}</p>

<p><b>8. What are the biggest challenges in your current document processing workflow?</b><br />{booking.q8_pain_points}</p>

<p><b>9. How do these inefficiencies impact your business?</b><br />{booking.q9_business_impact}</p>

<p><b>10. How ready is your organization to automate document processing?</b><br />{booking.q10_automation_readiness}</p>

<p><b>11. How do you currently verify extracted data before posting into ERP?</b><br />{booking.q11_validation_process}</p>

<p><b>12. How are documents currently entered into ERP – manual entry, upload, or API integration?</b><br />{booking.q12_erp_entry_method}</p>

<p><b>13. Do you have any mapping template or format that needs to be followed for ERP upload?</b><br />{booking.q13_mapping_template}</p>

<p><b>14. Is there an approval workflow configured in ERP before final posting?</b><br />{booking.q14_approval_workflow}</p>

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

</table>

<p>
To help us better understand your document structure and business process, kindly share 2–3 sample documents (Invoices, Purchase Orders, GRNs, Receipts, Delivery Challans, or any relevant documents) along with any field mapping templates or ERP import formats currently in use. This will enable our team to prepare a more accurate and effective demonstration tailored to your requirements.
</p>

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

q14_approval_workflow,

q1_other,
q6_other,
q7_other,
q9_other,
q10_other,
q12_other,
q14_other
)
VALUES(
%s,%s,%s,%s,%s,%s,
%s,%s,%s,%s,
%s,%s,
%s,
%s,
%s,
%s,
%s,
%s,
%s,
%s,
%s,
%s,%s,%s,%s,%s,%s,%s
)
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

    booking.q14_approval_workflow,

booking.q1_other,
booking.q6_other,
booking.q7_other,
booking.q9_other,
booking.q10_other,
booking.q12_other,
booking.q14_other
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
        "scanifybooking:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )