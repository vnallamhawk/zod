import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import useSWR from "swr";
import { Form, Field } from "react-final-form";
import { z } from "zod";
import AlientTestForm from "./components/AlientTestForm";
import AllSubmissions from "./views/AllSubmissions";
import { validateEnv } from "./env";

validateEnv();
export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/alien-test-form" style={{ marginRight: 10 }}>
          Alien Test Form
        </Link>
        <Link
          to="/submissions?page=1
        &limit=10"
        >
          All Submissions
        </Link>
      </nav>

      <Routes>
        <Route path="/alien-test-form" element={<AlientTestForm />} />
        <Route path="/submissions" element={<AllSubmissions />} />
        <Route path="*" element={<AlientTestForm />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}
