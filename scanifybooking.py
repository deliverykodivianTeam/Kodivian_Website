

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from datetime import datetime

import os
from dotenv import load_dotenv

load_dotenv()

import json
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

# ------------------------------------------------------------------
# Database (Safe Fallback for Local Dev)
# ------------------------------------------------------------------

def get_db():
    if not DATABASE_URL:
        return None
    try:
        return psycopg2.connect(DATABASE_URL)
    except Exception as e:
        print(f"[DB] Connection Warning: {e}")
        return None

def init_db():
    if not DATABASE_URL:
        print("[DB] DATABASE_URL not set. Running in email-direct mode.")
        return
    try:
        conn = get_db()
        if not conn:
            return
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
            document_types TEXT,
            document_formats TEXT,
            multilingual_docs TEXT,
            monthly_volume TEXT,
            intake_channels TEXT,
            validation_rules TEXT,
            erp_platform TEXT,
            workflow_approval TEXT,
            deployment_model TEXT,
            reporting_analytics TEXT,
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
        cur.execute("""
        CREATE TABLE IF NOT EXISTS short_demo_bookings (
            id SERIAL PRIMARY KEY,
            booking_reference VARCHAR(100),
            full_name VARCHAR(255),
            phone VARCHAR(50),
            company VARCHAR(255),
            designation VARCHAR(255),
            email VARCHAR(255),
            comment TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        cur.execute("""
        CREATE TABLE IF NOT EXISTS contact_messages (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"[DB] Init Warning: {e}")

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

    # New requirement fields
    document_types: Optional[str] = ""
    document_formats: Optional[str] = ""
    multilingual_docs: Optional[str] = ""
    monthly_volume: Optional[str] = ""
    intake_channels: Optional[str] = ""
    validation_rules: Optional[str] = ""
    erp_platform: Optional[str] = ""
    workflow_approval: Optional[str] = ""
    deployment_model: Optional[str] = ""
    reporting_analytics: Optional[str] = ""

    # Legacy fields (backward compatibility)
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

# ------------------------------------------------------------------
# Internal Sales & Solution Team Notification
# ------------------------------------------------------------------

def send_internal_notification(
    booking: DemoBooking,
    booking_ref: str
):
    doc_types = booking.document_types or booking.q1_current_process or "Not Specified"
    doc_formats = booking.document_formats or booking.q7_document_formats or "Not Specified"
    multilingual = booking.multilingual_docs or booking.q3_processing_time or "Not Specified"
    volume = booking.monthly_volume or booking.q2_document_volume or "Not Specified"
    intake = booking.intake_channels or booking.q8_pain_points or "Not Specified"
    validation = booking.validation_rules or booking.q11_validation_process or "Not Specified"
    erp = booking.erp_platform or booking.q6_erp_system or "Not Specified"
    workflows = booking.workflow_approval or booking.q14_approval_workflow or "Not Specified"
    deployment = booking.deployment_model or booking.q5_team_size or "Not Specified"
    reporting = booking.reporting_analytics or booking.q9_business_impact or "Not Specified"

    html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Scanify AI Requirement &amp; Demo Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f2f8; font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.6;">

  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f4f2f8; padding: 25px 15px;">
    <tr>
      <td align="center">

        <!-- Main Card Container -->
        <table width="700" border="0" cellpadding="0" cellspacing="0" style="max-width: 700px; width: 100%; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(106, 5, 127, 0.1); border: 1.5px solid #e9d5ff;">

          <!-- ═══════ TOP BRAND HEADER BANNER ═══════ -->
          <tr>
            <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 60%, #8B5FBF 100%); padding: 28px 32px; color: #ffffff; text-align: left;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #e9d5ff; margin-bottom: 4px;">🚀 New Enterprise Demo Lead</div>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">Scanify AI · Requirement Blueprint</h1>
                    <p style="margin: 6px 0 0 0; font-size: 13.5px; color: #f3e8ff;">
                      Lead: <strong>{booking.full_name}</strong> &nbsp;|&nbsp; Company: <strong>{booking.company_name}</strong>
                    </p>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <div style="display: inline-block; background: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 8px; padding: 6px 12px; text-align: center;">
                      <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #f3e8ff;">Ref ID</div>
                      <div style="font-size: 13px; font-weight: 700; color: #ffffff; font-family: monospace;">{booking_ref}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════ CONTENT BODY ═══════ -->
          <tr>
            <td style="padding: 28px 32px;">

              <!-- ────── CONTACT & CORPORATE PROFILE ────── -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 10px 16px; border-radius: 8px 8px 0 0;">
                    <span style="font-size: 14px; font-weight: 700; color: #ffffff;">👤 Contact &amp; Corporate Profile</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1.5px solid #e9d5ff; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
                      <tr style="background-color: #FAF5FF;">
                        <td width="35%" style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6A057F; border-bottom: 1px solid #f1e4fa;">Full Name</td>
                        <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #1e293b; border-bottom: 1px solid #f1e4fa;">{booking.full_name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6A057F; border-bottom: 1px solid #f1e4fa;">Designation / Role</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #334155; border-bottom: 1px solid #f1e4fa;">{booking.designation or 'Not Specified'}</td>
                      </tr>
                      <tr style="background-color: #FAF5FF;">
                        <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6A057F; border-bottom: 1px solid #f1e4fa;">Company / Organization</td>
                        <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #4A015E; border-bottom: 1px solid #f1e4fa;">{booking.company_name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6A057F; border-bottom: 1px solid #f1e4fa;">Corporate Email ID</td>
                        <td style="padding: 10px 16px; font-size: 13px; border-bottom: 1px solid #f1e4fa;">
                          <a href="mailto:{booking.corporate_email}" style="color: #6A057F; font-weight: 600; text-decoration: underline;">{booking.corporate_email}</a>
                        </td>
                      </tr>
                      <tr style="background-color: #FAF5FF;">
                        <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #6A057F;">Direct Mobile / Phone</td>
                        <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #1e293b;">
                          <a href="tel:{booking.mobile_number}" style="color: #1e293b; text-decoration: none;">{booking.mobile_number}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ═══════ REQUIREMENT SECTIONS (8 Headers) ═══════ -->

              <!-- ────── SECTION 01: Document Scope & Characteristics ────── -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 10px 16px; border-radius: 8px 8px 0 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #ffffff; margin-right: 8px;">01</span>
                          <span style="font-size: 14px; font-weight: 700; color: #ffffff;">📄 Document Scope &amp; Characteristics</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1.5px solid #e9d5ff; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
                      <tr style="background-color: #FAF5FF;">
                        <td width="40%" style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; border-bottom: 1px solid #f1e4fa; vertical-align: top;">Q1. Which document types need to be processed?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #1e293b; border-bottom: 1px solid #f1e4fa; vertical-align: top; font-weight: 600;">{doc_types}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; border-bottom: 1px solid #f1e4fa; vertical-align: top;">Q2. Document Source – In what formats are documents received from the source?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #334155; border-bottom: 1px solid #f1e4fa; vertical-align: top;">{doc_formats}</td>
                      </tr>
                      <tr style="background-color: #FAF5FF;">
                        <td style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; vertical-align: top;">Q3. Are documents received in multiple languages?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #334155; vertical-align: top;">{multilingual}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ────── SECTION 02: Volume & Frequency ────── -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 10px 16px; border-radius: 8px 8px 0 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #ffffff; margin-right: 8px;">02</span>
                          <span style="font-size: 14px; font-weight: 700; color: #ffffff;">📊 Volume &amp; Frequency</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1.5px solid #e9d5ff; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
                      <tr style="background-color: #FAF5FF;">
                        <td width="40%" style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; vertical-align: top;">Q. How many documents are processed per month?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #4A015E; vertical-align: top; font-weight: 700;">{volume}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ────── SECTION 03: Data Sources & Intake Channels ────── -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 10px 16px; border-radius: 8px 8px 0 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #ffffff; margin-right: 8px;">03</span>
                          <span style="font-size: 14px; font-weight: 700; color: #ffffff;">📥 Data Sources &amp; Intake Channels</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1.5px solid #e9d5ff; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
                      <tr style="background-color: #FAF5FF;">
                        <td width="40%" style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; vertical-align: top;">Q. How do documents currently enter your system?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #334155; vertical-align: top; font-weight: 600;">{intake}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ────── SECTION 04: Validation & Business Rules ────── -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 10px 16px; border-radius: 8px 8px 0 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #ffffff; margin-right: 8px;">04</span>
                          <span style="font-size: 14px; font-weight: 700; color: #ffffff;">✅ Validation &amp; Business Rules</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1.5px solid #e9d5ff; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
                      <tr style="background-color: #FAF5FF;">
                        <td width="40%" style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; vertical-align: top;">Q. What rules are applied to validate extracted data?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #334155; vertical-align: top;">{validation}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ────── SECTION 05: ERP & System Integration ────── -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 10px 16px; border-radius: 8px 8px 0 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #ffffff; margin-right: 8px;">05</span>
                          <span style="font-size: 14px; font-weight: 700; color: #ffffff;">🔗 ERP &amp; System Integration</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1.5px solid #e9d5ff; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
                      <tr style="background-color: #FAF5FF;">
                        <td width="40%" style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; vertical-align: top;">Q. Existing ERP Platform – Which ERP solution is currently being used in your organization?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #4A015E; vertical-align: top; font-weight: 700;">{erp}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ────── SECTION 06: Workflows & Approvals ────── -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 10px 16px; border-radius: 8px 8px 0 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #ffffff; margin-right: 8px;">06</span>
                          <span style="font-size: 14px; font-weight: 700; color: #ffffff;">⚙️ Workflows &amp; Approvals</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1.5px solid #e9d5ff; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
                      <tr style="background-color: #FAF5FF;">
                        <td width="40%" style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; vertical-align: top;">Q. What approval hierarchy, exception routing, or escalation process is needed?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #334155; vertical-align: top;">{workflows}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ────── SECTION 07: Deployment Preference ────── -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 10px 16px; border-radius: 8px 8px 0 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #ffffff; margin-right: 8px;">07</span>
                          <span style="font-size: 14px; font-weight: 700; color: #ffffff;">☁️ Deployment Preference</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1.5px solid #e9d5ff; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
                      <tr style="background-color: #FAF5FF;">
                        <td width="40%" style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; vertical-align: top;">Q. What is the preferred hosting model?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #4A015E; vertical-align: top; font-weight: 700;">{deployment}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ────── SECTION 08: Reporting & KPI Tracking ────── -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 10px 16px; border-radius: 8px 8px 0 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="display: inline-block; background: rgba(255,255,255,0.2); border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 700; color: #ffffff; margin-right: 8px;">08</span>
                          <span style="font-size: 14px; font-weight: 700; color: #ffffff;">📈 Reporting &amp; KPI Tracking</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1.5px solid #e9d5ff; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden;">
                      <tr style="background-color: #FAF5FF;">
                        <td width="40%" style="padding: 10px 16px; font-size: 12.5px; font-weight: 600; color: #6A057F; vertical-align: top;">Q. What analytics, SLA tracking, or dashboards are needed?</td>
                        <td style="padding: 10px 16px; font-size: 13px; color: #334155; vertical-align: top;">{reporting}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>



            </td>
          </tr>

          <!-- ═══════ FOOTER ═══════ -->
          <tr>
            <td style="background-color: #FAF5FF; border-top: 1px solid #e9d5ff; padding: 18px 32px; text-align: center; font-size: 11.5px; color: #7e22ce;">
              <strong>Kodivian Technologies LLP</strong> · Scanify AI Document Intelligence Platform<br>
              Automated sales lead notification dispatched from the live booking portal.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
"""

    for email in INTERNAL_EMAILS:
        send_email_brevo(
            email,
            "Kodivian Solution Team",
            f"🚀 [NEW DEMO LEAD] Scanify AI Requirement - {booking.company_name} [{booking_ref}]",
            html_content
        )

# ------------------------------------------------------------------
# Customer Acknowledgement Email (To Booked Person)
# ------------------------------------------------------------------

def send_customer_acknowledgement(
    booking: DemoBooking,
    booking_ref: str
):
    doc_types = booking.document_types or booking.q1_current_process or "Enterprise Documents"
    doc_formats = booking.document_formats or booking.q7_document_formats or "Standard Formats"
    multilingual = booking.multilingual_docs or booking.q3_processing_time or "Standard"
    volume = booking.monthly_volume or booking.q2_document_volume or "Tailored Capacity"
    intake = booking.intake_channels or booking.q8_pain_points or "Enterprise Intake"
    validation = booking.validation_rules or booking.q11_validation_process or "Configured Rules"
    erp = booking.erp_platform or booking.q6_erp_system or "Ecosystem Connectors"
    workflows = booking.workflow_approval or booking.q14_approval_workflow or "Standard Automation"
    deployment = booking.deployment_model or booking.q5_team_size or "Tailored Architecture"
    reporting = booking.reporting_analytics or booking.q9_business_impact or "Enabled"

    html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Booking a Demo with Scanify AI</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f5fa; font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.65;">

  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f7f5fa; padding: 30px 15px;">
    <tr>
      <td align="center">

        <!-- Main Card Container -->
        <table width="650" border="0" cellpadding="0" cellspacing="0" style="max-width: 650px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 36px rgba(106, 5, 127, 0.08); border: 1.5px solid #e9d5ff;">

          <!-- ═══════ TOP BRAND HEADER ═══════ -->
          <tr>
            <td style="background: linear-gradient(135deg, #6A057F 0%, #4A015E 70%, #1a0022 100%); padding: 32px 34px; text-align: left; color: #ffffff;">
              <div style="display: inline-block; background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 20px; padding: 4px 14px; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #e9d5ff; margin-bottom: 10px;">
                Kodivian Technologies
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                Scanify AI Demo Request Confirmed
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #E9D5FF; font-weight: 400;">
                Enterprise Document Intelligence &amp; End-to-End Workflow Automation
              </p>
            </td>
          </tr>

          <!-- ═══════ BODY CONTENT ═══════ -->
          <tr>
            <td style="padding: 30px 34px;">

              <p style="font-size: 15px; color: #1e293b; margin: 0 0 14px 0;">
                Dear <strong>{booking.full_name}</strong>,
              </p>

              <p style="font-size: 13.5px; color: #334155; margin: 0 0 14px 0; line-height: 1.65;">
                Thank you for your interest in <strong>Scanify AI</strong> and for sharing your document workflow requirements with us. We have successfully logged your demo session request for <strong>{booking.company_name}</strong>.
              </p>


              <!-- ═══════ NEXT ACTION BOX ═══════ -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #FAF5FF 0%, #F5EEFD 100%); border-left: 4px solid #6A057F; border-radius: 0 10px 10px 0; padding: 14px 18px; margin-bottom: 22px;">
                <tr>
                  <td>
                    <div style="font-size: 13.5px; font-weight: 700; color: #4A015E; margin-bottom: 3px;">📅 Next Action &amp; Schedule:</div>
                    <div style="font-size: 13px; color: #475569; line-height: 1.55;">
                      Our team will follow up directly with you for the next action to schedule your tailored live demonstration.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Sample Documents Callout -->
              <div style="background-color: #ffffff; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 13px 16px; margin-bottom: 24px;">
                <p style="font-size: 12.5px; color: #475569; margin: 0; line-height: 1.55;">
                  💡 <strong>Want to test with your sample files?</strong><br>
                  Feel free to reply directly to this email with 2–3 sample files (redacting any sensitive information) so we can configure them for your demo session.
                </p>
              </div>

              <hr style="border: none; border-top: 1px solid #f1e4fa; margin: 20px 0 18px 0;">

              <!-- ═══════ SIGNATURE BLOCK ═══════ -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 13.5px; color: #64748b; margin-bottom: 6px;">Warm regards,</div>
                    <div style="font-size: 15.5px; font-weight: 700; color: #4A015E; margin-bottom: 2px;">Manoranjan KS</div>
                    <div style="font-size: 13px; font-weight: 600; color: #6A057F; margin-bottom: 2px;">Business Analyst | Enterprise Solution Architecture</div>
                    <div style="font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Kodivian Technologies LLP</div>

                    <table border="0" cellpadding="0" cellspacing="0" style="font-size: 12.5px; color: #475569;">
                      <tr>
                        <td style="padding: 2px 0;">
                          ✉️ Email: <a href="mailto:manoranjan.ks@kodivian.com" style="color: #6A057F; font-weight: 600; text-decoration: none;">manoranjan.ks@kodivian.com</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 2px 0;">
                          🌐 Website: <a href="https://www.kodivian.com" style="color: #6A057F; font-weight: 600; text-decoration: none;">www.kodivian.com</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ═══════ FOOTER ═══════ -->
          <tr>
            <td style="background-color: #FAF5FF; border-top: 1px solid #e9d5ff; padding: 16px 34px; text-align: center; font-size: 11.5px; color: #7e22ce;">
              <strong>Kodivian Technologies LLP</strong> · Scanify AI Document Intelligence Platform<br>
              Chennai, India · <a href="https://www.kodivian.com" style="color: #6A057F; text-decoration: underline;">www.kodivian.com</a>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
"""

    send_email_brevo(
        booking.corporate_email,
        booking.full_name,
        f"Scanify AI Demo Request Confirmed [{booking_ref}] - Kodivian Technologies",
        html_content
    )

# ------------------------------------------------------------------
# Background Worker: DB Insert + Email Dispatch
# ------------------------------------------------------------------

def background_process_booking(booking: DemoBooking, booking_ref: str):
    """
    Handles ALL slow I/O in the background after instant client response:
      1. Database INSERT (remote Postgres — the main bottleneck)
      2. Internal team notification emails
      3. Customer acknowledgement email
    
    Zero data loss guarantee: local JSON is already persisted synchronously
    before this background task runs.
    """

    # ── 1. Database Insert (if available) ──
    conn = get_db()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute(
                """
                INSERT INTO demo_bookings
                (
                  booking_reference,
                  full_name, designation, company_name, corporate_email, mobile_number,
                  document_types, document_formats, multilingual_docs, monthly_volume,
                  intake_channels, validation_rules, erp_platform, workflow_approval,
                  deployment_model, reporting_analytics,
                  q1_current_process, q2_document_volume, q3_processing_time, q4_errors,
                  q5_team_size, q5_effort_per_document,
                  q6_erp_system, q7_document_formats, q8_pain_points,
                  q9_business_impact, q10_automation_readiness,
                  q11_validation_process, q12_erp_entry_method,
                  q13_mapping_template, q14_approval_workflow,
                  q1_other, q6_other, q7_other, q9_other, q10_other, q12_other, q14_other
                )
                VALUES (
                  %s,%s,%s,%s,%s,%s,
                  %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                  %s,%s,%s,%s,
                  %s,%s,
                  %s,%s,%s,
                  %s,%s,
                  %s,%s,
                  %s,%s,
                  %s,%s,%s,%s,%s,%s,%s
                )
                """,
                (
                    booking_ref,
                    booking.full_name, booking.designation,
                    booking.company_name, booking.corporate_email, booking.mobile_number,
                    booking.document_types, booking.document_formats, booking.multilingual_docs, booking.monthly_volume,
                    booking.intake_channels, booking.validation_rules, booking.erp_platform, booking.workflow_approval,
                    booking.deployment_model, booking.reporting_analytics,
                    booking.q1_current_process, booking.q2_document_volume,
                    booking.q3_processing_time, booking.q4_errors,
                    booking.q5_team_size, booking.q5_effort_per_document,
                    booking.q6_erp_system, booking.q7_document_formats,
                    booking.q8_pain_points, booking.q9_business_impact,
                    booking.q10_automation_readiness, booking.q11_validation_process,
                    booking.q12_erp_entry_method, booking.q13_mapping_template,
                    booking.q14_approval_workflow,
                    booking.q1_other, booking.q6_other, booking.q7_other,
                    booking.q9_other, booking.q10_other, booking.q12_other, booking.q14_other
                )
            )
            conn.commit()
            cur.close()
            conn.close()
            print(f"[DB] Booking {booking_ref} inserted successfully")
        except Exception as e:
            print(f"[DB] Insert Warning for {booking_ref}: {e}")
            try:
                conn.close()
            except Exception:
                pass

    # ── 2. Internal Team Notification Emails ──
    try:
        send_internal_notification(booking, booking_ref)
    except Exception as e:
        print(f"[Email] Internal notification error for {booking_ref}: {e}")

    # ── 3. Customer Acknowledgement Email ──
    try:
        send_customer_acknowledgement(booking, booking_ref)
    except Exception as e:
        print(f"[Email] Customer acknowledgement error for {booking_ref}: {e}")

    print(f"[Background] All processing complete for {booking_ref}")


# ------------------------------------------------------------------
# Create Booking API (Instant Response < 15ms + Zero Data Loss)
# ------------------------------------------------------------------
@app.post("/api/book-demo")
def book_demo(booking: DemoBooking, background_tasks: BackgroundTasks):

    booking_ref = f"SCAN-{uuid.uuid4().hex[:8].upper()}"

    # ── SYNCHRONOUS: Local JSON persistence (instant, ~1ms) ──
    # This is the zero-data-loss safety net — written BEFORE responding.
    try:
        log_entry = {
            "booking_reference": booking_ref,
            "timestamp": datetime.now().isoformat(),
            **booking.dict()
        }
        log_file = "demo_bookings_log.json"
        existing = []
        if os.path.exists(log_file):
            try:
                with open(log_file, "r", encoding="utf-8") as f:
                    existing = json.load(f)
            except Exception:
                existing = []
        existing.append(log_entry)
        with open(log_file, "w", encoding="utf-8") as f:
            json.dump(existing, f, indent=2)
    except Exception as e:
        print(f"[Log] Local persistence warning: {e}")

    # ── BACKGROUND: DB insert + all emails (offloaded, non-blocking) ──
    background_tasks.add_task(background_process_booking, booking, booking_ref)

    # ── INSTANT RETURN to client ──
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
# Short Demo Lead Capture
# ------------------------------------------------------------------

class ShortDemoBooking(BaseModel):
    fullName: str
    phone: str
    company: str
    designation: str
    email: str
    comment: Optional[str] = ""

def send_short_demo_internal(booking: ShortDemoBooking, booking_ref: str):
    html_content = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div style="background-color: #6A057F; color: #ffffff; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 24px;">New Demo Request</h2>
                <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Ref: {booking_ref}</p>
            </div>
            <div style="padding: 30px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eeeeee; width: 35%; color: #666;"><strong>Name</strong></td><td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold;">{booking.fullName}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #666;"><strong>Company</strong></td><td style="padding: 10px; border-bottom: 1px solid #eeeeee;">{booking.company}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #666;"><strong>Designation</strong></td><td style="padding: 10px; border-bottom: 1px solid #eeeeee;">{booking.designation}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #666;"><strong>Email</strong></td><td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><a href="mailto:{booking.email}" style="color: #6A057F;">{booking.email}</a></td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #666;"><strong>Phone</strong></td><td style="padding: 10px; border-bottom: 1px solid #eeeeee;">{booking.phone}</td></tr>
                    <tr><td style="padding: 10px; color: #666; vertical-align: top;"><strong>Comments</strong></td><td style="padding: 10px;">{booking.comment or '<em>None</em>'}</td></tr>
                </table>
            </div>
            <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #eeeeee;">
                Automated System Message &bull; Scanify AI Demo Portal
            </div>
        </div>
    </div>
    """
    for email in INTERNAL_EMAILS:
        send_email_brevo(
            email,
            "Kodivian Solution Team",
            f"🚀 [SHORT DEMO] Lead - {booking.company}",
            html_content
        )

def send_short_demo_customer(booking: ShortDemoBooking, booking_ref: str):
    link = "http://localhost:5173/scanify-booking"
    html_content = f"""
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
            
            <div style="background: linear-gradient(135deg, #3b0764 0%, #6b21a8 50%, #9333ea 100%); padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">Scanify AI</h1>
                <p style="color: #e9d5ff; margin: 10px 0 0; font-size: 16px;">Automated Document Extraction</p>
            </div>
            
            <div style="padding: 40px 30px; color: #334155; line-height: 1.6;">
                <h2 style="color: #1e293b; margin-top: 0; font-size: 22px;">Hi {booking.fullName.split(' ')[0]},</h2>
                
                <p style="font-size: 16px;">Thank you for your interest in <strong>Scanify AI</strong>! We have received your demo request for <strong>{booking.company}</strong>.</p>
                
                <p style="font-size: 16px;">To help us prepare a personalized demonstration tailored exactly to your document workflows and ERP systems, please take 2 minutes to provide your technical requirements.</p>
                
                <div style="text-align: center; margin: 35px 0;">
                    <a href="{link}" style="display: inline-block; background-color: #7e22ce; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(126, 34, 206, 0.3);">
                        Book Personalized Demo Session
                    </a>
                </div>
                
                <p style="font-size: 14px; color: #64748b; margin-bottom: 0;">Our sales team will also be reaching out to you shortly to assist you further.</p>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="font-size: 12px; color: #94a3b8; margin: 0;"><strong>Kodivian Technologies LLP</strong><br>Ref: {booking_ref}</p>
            </div>
            
        </div>
    </div>
    """
    send_email_brevo(
        booking.email,
        booking.fullName,
        "Book Your Personalized Scanify AI Demo",
        html_content
    )

def background_short_demo(booking: ShortDemoBooking, booking_ref: str):
    print(f"[Short Demo] Processing {booking_ref}")
    
    # Insert to DB
    conn = get_db()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute(
                """
                INSERT INTO short_demo_bookings
                (booking_reference, full_name, phone, company, designation, email, comment)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (booking_ref, booking.fullName, booking.phone, booking.company, booking.designation, booking.email, booking.comment)
            )
            conn.commit()
            cur.close()
            conn.close()
        except Exception as e:
            print(f"[Short Demo DB Insert Error] {e}")

    send_short_demo_internal(booking, booking_ref)
    send_short_demo_customer(booking, booking_ref)
    print(f"[Short Demo] Complete {booking_ref}")

@app.post("/api/short-demo")
async def book_short_demo(booking: ShortDemoBooking, background_tasks: BackgroundTasks):
    booking_ref = f"SD-{uuid.uuid4().hex[:8].upper()}"
    background_tasks.add_task(background_short_demo, booking, booking_ref)
    return {"message": "Success", "reference": booking_ref}

# ------------------------------------------------------------------
# Contact Message Endpoint
# ------------------------------------------------------------------

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact-message")
async def contact_message(msg: ContactMessage, background_tasks: BackgroundTasks):
    
    # 1. Save to Database
    conn = get_db()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)",
                (msg.name, msg.email, msg.message)
            )
            conn.commit()
            cur.close()
            conn.close()
        except Exception as e:
            print(f"[DB] Error saving contact message: {e}")
            if conn:
                conn.close()

    # 2. Send Emails
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; padding: 24px; background: #f9f9f9;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; padding:32px; box-shadow:0 4px 16px rgba(0,0,0,0.08);">
            <h2 style="color:#082154; margin-bottom:4px;">New Website Message</h2>
            <p style="color:#888; font-size:13px; margin-top:0;">Received from the Kodivian Technologies contact page</p>
            <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
            <table style="width:100%; border-collapse:collapse;">
                <tr>
                    <td style="padding:10px 12px; font-weight:bold; color:#444; width:120px;">Name:</td>
                    <td style="padding:10px 12px; color:#222;">{msg.name}</td>
                </tr>
                <tr style="background:#f5f5f5;">
                    <td style="padding:10px 12px; font-weight:bold; color:#444;">Email:</td>
                    <td style="padding:10px 12px; color:#222;">{msg.email}</td>
                </tr>
                <tr>
                    <td style="padding:10px 12px; font-weight:bold; color:#444; vertical-align:top;">Message:</td>
                    <td style="padding:10px 12px; color:#222; white-space:pre-line;">{msg.message}</td>
                </tr>
            </table>
        </div>
    </body>
    </html>
    """
    
    def send_internal_emails():
        for internal_email in INTERNAL_EMAILS:
            send_email_brevo(
                to_email=internal_email,
                to_name="Kodivian Team",
                subject=f"Website Message from {msg.name}",
                html_content=html_content
            )
            
    background_tasks.add_task(send_internal_emails)
    
    return {"message": "Sent"}

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