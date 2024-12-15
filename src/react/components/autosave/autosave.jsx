import React, { useState, useEffect } from 'react';

import "./autosave.css";

export const Autosave = () => {
  const [autoSaveOn, setAutoSaveOn] = useState(false);

  useEffect(() => {
    chrome.storage?.local.get(["autoSaveOn"], (result) => {
      setAutoSaveOn(result.autoSaveOn);
    });
  }, []);

  const changeAutoSave = () => {
    let newState = !autoSaveOn;

    setAutoSaveOn(newState)
    chrome.storage?.local.set(
      {
        autoSaveOn: newState
      }
    );
  }

  return (
    <div className="alert alert-info autosave-status" role="alert">
      Autosave is:
      <div className="form-check">
        <input className="form-check-input" type="radio" name="autoSaveOn" id="autoSave_on" checked={autoSaveOn} onChange={changeAutoSave} />
        <label className="form-check-label">
          On
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="autoSaveOff" id="autoSave_off" checked={!autoSaveOn} onChange={changeAutoSave} />
        <label className="form-check-label">
          Off
        </label>
      </div>
    </div>
  );
};
