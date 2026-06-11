import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DemoBookingPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      navigate("/scanify-booking");
      if (onClose) onClose();
    }
  }, [isOpen, navigate, onClose]);

  return null;
};

export default DemoBookingPopup;
