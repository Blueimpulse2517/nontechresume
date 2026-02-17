import React from "react";
import styles from "./ColorThemeSelector.module.css";

const COLORS = [
  { name: "Blue", value: "#2563eb" },
  { name: "Dark Green", value: "#166534" },
  { name: "Maroon", value: "#7f1d1d" },
  { name: "Grey", value: "#4b5563" },
  { name: "Black", value: "#000000" },
  { name: "Navy Blue", value: "#1e3a8a" }
];

const ColorThemeSelector = ({ selected, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} style={{textAlign:"center"}}>Choose Color Theme</label>

      <div className={styles.swatches}>
        {COLORS.map(color => (
          <button
            key={color.value}
            type="button"
            className={`${styles.swatch} ${
              selected === color.value ? styles.active : ""
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => onChange(color.value)}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorThemeSelector;
