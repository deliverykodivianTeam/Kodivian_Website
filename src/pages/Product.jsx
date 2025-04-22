import React, { useState } from "react";
import scanify from "../assets/scanify.png";
import intellidocsLogo from "../assets/intellidocs.png";
import rpa from "../assets/rpa.png";
import process_builder from "../assets/process_builder.png";
import "../styles/Product.css";
import PurpleGeometric from "../assets/purple-geometric.jpg";
import PurpleWave from "../assets/purple-wave.png";

const Product = () => {
  const [showAll, setShowAll] = useState(true);
  const [showScanifyDetails, setShowScanifyDetails] = useState(false);
  const [showRpaDetails, setShowRpaDetails] = useState(false);
  const [showIntelliDocsDetails, setShowIntelliDocsDetails] = useState(false);
  const [showProcessBuilderDetails, setShowProcessBuilderDetails] =
    useState(false);

  const handleScanifyClick = () => {
    setShowAll(false);
    setShowScanifyDetails(true);
    setShowRpaDetails(false);
    setShowIntelliDocsDetails(false);
    setShowProcessBuilderDetails(false);
  };

  const handleRpaClick = () => {
    setShowAll(false);
    setShowScanifyDetails(false);
    setShowRpaDetails(true);
    setShowIntelliDocsDetails(false);
    setShowProcessBuilderDetails(false);
  };

  const handleIntelliDocsClick = () => {
    setShowAll(false);
    setShowScanifyDetails(false);
    setShowRpaDetails(false);
    setShowIntelliDocsDetails(true);
    setShowProcessBuilderDetails(false);
  };

  const handleProcessBuilderClick = () => {
    setShowAll(false);
    setShowScanifyDetails(false);
    setShowRpaDetails(false);
    setShowIntelliDocsDetails(false);
    setShowProcessBuilderDetails(true);
  };

  const handleBackToProductsClick = () => {
    setShowAll(true);
    setShowScanifyDetails(false);
    setShowRpaDetails(false);
    setShowIntelliDocsDetails(false);
    setShowProcessBuilderDetails(false);
  };

  return (
    <div className="product-page">
      <img src={PurpleWave} alt="Purple Wave Design" className="wave-header" />
      <h1>Our Products</h1>
      <p>
        Explore our innovative solutions designed to streamline your business
        processes.
      </p>
      <div className="feature-boxes-container">
        {showAll && (
          <>
            <div
              className="feature-box scanify-box"
              onClick={handleScanifyClick}
            >
              <h2>Scanify</h2>
              <div className="image-container">
                <img
                  src={scanify}
                  alt="Scanify Illustration"
                  className="product-image"
                />
              </div>
              <button className="learn-more-button" style={{ display: "none" }}>
                Learn More
              </button>
            </div>
            <div
              className="feature-box intellidocs-box"
              onClick={handleIntelliDocsClick}
            >
              <h2>IntelliDocs</h2>
              <div className="image-container">
                <img
                  src={intellidocsLogo}
                  alt="IntelliDocs Illustration"
                  className="product-image"
                />
              </div>
              <button className="learn-more-button" style={{ display: "none" }}>
                Learn More
              </button>
            </div>
            <div className="feature-box rpa-box" onClick={handleRpaClick}>
              <h2>RPA</h2>
              <div className="image-container">
                <img
                  src={rpa}
                  alt="RPA Illustration"
                  className="product-image"
                />
              </div>
              <button className="learn-more-button" style={{ display: "none" }}>
                Learn More
              </button>
            </div>
            <div
              className="feature-box process-builder-box"
              onClick={handleProcessBuilderClick}
            >
              <h2>Process Builder</h2>
              <div className="image-container">
                <img
                  src={process_builder}
                  alt="Process Builder Illustration"
                  className="product-image"
                />
              </div>
              <button className="learn-more-button" style={{ display: "none" }}>
                Learn More
              </button>
            </div>
          </>
        )}
        {showScanifyDetails && (
          <div className="feature-box scanify-box scanify-details">
            <h2>Scanify Details</h2>
            <p>
              <strong>Scanify :</strong>
              <br />
              <br />
              🔄 Invoice Processing Options
              <br />
              ✅ Manual Invoice Processing
              <br />
              Process invoices one by one with full control and flexibility.
              This approach allows for a detailed review and tailored
              customization of each invoice, ideal for handling complex or
              unique billing formats.
              <br />
              <br />
              🔁 Batch Invoice Processing
              <br />
              Function:
              <br />
              Manage and process multiple invoices simultaneously.
              <br />
              <br />
              Benefits:
              <br />
              Saves time by eliminating repetitive manual tasks.
              <br />
              Increases consistency and minimizes human errors by grouping
              similar invoices.
              <br />
              Ideal for businesses with recurring formats like monthly service
              charges or vendor payments.
              <br />
              <br />
              Use Cases:
              <br />
              Monthly utility or subscription invoices
              <br />
              Vendor or supplier invoices with consistent layouts
              <br />
              Recurring service billing (e.g., cleaning, maintenance)
              <br />
              <br />
              🧠 Smart OCR Engine for Invoice Extraction
              <br />
              Our Invoice OCR API is built for intelligent automation and global
              adaptability.
              <br />
              <br />
              Core Features:
              <br />
              Seamless integration with your existing ERP, CRM, or custom
              workflows
              <br />
              Multi-language support for global invoice formats
              <br />
              <br />
              Upload invoices via:
              <br />
              Email
              <br />
              API
              <br />
              Desktop/Drive
              <br />
              Dropbox
              <br />
              RPA Bots
              <br />
              Cloud Storage
              <br />
              <br />
              Data Handling:
              <br />
              Automatically extract key fields (e.g., Vendor Name, Invoice
              Number, Date, Amount, Table Items)
              <br />
              Built-in verification interface for quick and accurate reviews
              <br />
              Custom field mapping for personalized output formats
              <br />
              <br />
              🔗 Easy Integration & Customization
              <br />
              Plug-and-play API for fast implementation
              <br />
              Adapts to your existing infrastructure
              <br />
              Dedicated support to optimize and scale with your business needs
              <br />
              Transition smoothly with minimal setup or training
            </p>
            <button className="back-button" onClick={handleBackToProductsClick}>
              Back to Products
            </button>
          </div>
        )}
        {showRpaDetails && (
          <div className="feature-box rpa-box rpa-details">
            <h2>RPA Details</h2>
            <p>
              <strong>Robotic Process Automation (RPA)</strong> is a
              cutting-edge technology that uses software bots to automate
              repetitive and rule-based tasks. These bots mimic human
              actions—clicks, typing, navigation, and data handling—to
              streamline business processes and boost productivity.
              <br />
              <br />
              ⏱️ <strong>Faster Operations</strong> – Automate time-consuming
              tasks
              <br />
              <br />
              🎯 <strong>Error Reduction</strong> – Eliminate manual mistakes
              <br />
              <br />
              💰 <strong>Cost Efficiency</strong> – Reduce operational costs
              <br />
              <br />
              🔗 <strong>System Integration</strong> – Seamlessly work with
              existing software
              <br />
              <br />
              📈 <strong>Scalability</strong> – Scale processes without hiring
              more people
              <br />
              <br />
              📊 <strong>Data Insights</strong> – Gain better visibility through
              process data
              <br />
              <br />
              Robotic Process Automation (RPA) is revolutionizing the way
              businesses operate by automating routine, repetitive tasks that
              were traditionally performed by humans. Through intelligent
              software bots, RPA mimics human actions like data entry, form
              filling, file movement, and system integration—across
              applications—without altering existing infrastructure. This leads
              to faster operations, reduced errors, and significant cost
              savings. Whether it’s processing invoices, onboarding employees,
              or extracting data from documents, RPA empowers organizations to
              improve efficiency, enhance accuracy, and focus human efforts on
              strategic decision-making.
            </p>
            <button className="back-button" onClick={handleBackToProductsClick}>
              Back to Products
            </button>
          </div>
        )}
        {showIntelliDocsDetails && (
          <div className="feature-box intellidocs-box intellidocs-details">
            <h2>IntelliDocs Details</h2>
            <p>
              <strong>Our Document Management System</strong> offers a flexible
              and secure platform to create, manage, and organize documents with
              complete control. Users can easily generate documents such as
              contracts, invoices, agreements, and internal forms, and structure
              them using a branch-based hierarchy for better organization across
              teams, departments, or locations.
              <br />
              <br />
              Each document can be fully customized by assigning specific
              fields—such as text inputs, signature field—depending on the
              document type and purpose. Users can define which fields are
              visible, editable, or required at each stage of the process.
              <br />
              <br />
              Integrated digital signature support allows authorized personnel
              to securely sign documents directly within the platform, ensuring
              legal compliance and streamlining the workflow. For invoices and
              approval-based documents, you can define a multi-step approval
              process, assigning approvers at each stage. Each step can trigger
              notifications, updates, and status changes, providing complete
              traceability and accountability.
            </p>
            <button className="back-button" onClick={handleBackToProductsClick}>
              Back to Products
            </button>
          </div>
        )}
        {showProcessBuilderDetails && (
          <div className="feature-box process-builder-box process-builder-details">
            <h2>Process Builder Details</h2>
            <p>
              <strong>Our Process Builder</strong> allows users to easily design
              custom workflows using a simple drag-and-drop interface. Without
              writing any code, you can create dynamic forms, add multiple
              fields, and define workflow stages tailored to your business
              needs. Once a form is submitted, it automatically moves through
              predefined approval stages, with access granted to managers for
              review and approval. Each stage can include custom actions,
              notifications, and conditional logic. A dedicated user portal
              ensures that every user sees only their relevant tasks and
              progress, making the entire process seamless, efficient, and fully
              trackable.
              <br />
              <br />
              Our powerful Process Builder transforms the way businesses manage
              and automate their internal workflows. With an intuitive
              drag-and-drop interface, users can create custom forms tailored to
              specific processes—whether it's data collection, document
              submission, or task tracking. Each form can include a wide variety
              of field types such as text inputs, dropdowns, file uploads,
              checkboxes, tables, and more.
              <br />
              <br />
              Once the form is created, you can easily define a multi-step
              workflow, assigning roles and permissions for each stage. Managers
              and decision-makers are given secure access to review, approve, or
              reject submissions, ensuring every process moves forward in a
              controlled and traceable manner. Approval logic can be customized,
              supporting both sequential and parallel approval paths.
              <br />
              <br />
              The system supports real-time updates, notifications, and
              conditional routing based on the input data. Every user has access
              to a personalized user portal where they can track their
              submissions, monitor approval status, and receive messages or
              feedback from reviewers.
              <br />
              <br />
              Whether you're automating HR requests, purchase orders, client
              onboarding, or internal audits, our Process Builder makes it easy
              to digitize, streamline, and scale your operations—without writing
              a single line of code.
            </p>
            <button className="back-button" onClick={handleBackToProductsClick}>
              Back to Products
            </button>
          </div>
        )}
      </div>
      <img
        src={PurpleGeometric}
        alt="Purple Geometric Design"
        className="geometric-footer"
      />
    </div>
  );
};

export default Product;
