import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import faIr from "antd/lib/locale-provider/fa_IR";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider direction="rtl" locale={faIr}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
