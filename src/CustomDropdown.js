import React from "react";
import "./CustomDropdown.css";

function CustomDropdown({ devices, selectedDevices, onDeviceChange }) {
  return (
    <span className="custom-dropdown">
      <div className="custom-dropdown-header">Select Devices</div>
      <div className="custom-dropdown-content">
        {devices.map((device) => (
          <label key={device.id}>
            <input
              type="checkbox"
              value={device.id}
              checked={selectedDevices.includes(device.id)}
              onChange={() => onDeviceChange(device.id)}
            />
            {device.naziv}
          </label>
        ))}
      </div>
    </span>
  );
}

export default CustomDropdown;
