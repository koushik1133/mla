"use client";

import { motion } from "framer-motion";

const facts = [
  { value: "No. 97", label: "Constituency" },
  { value: "8", label: "Mandals" },
  { value: "2.27L", label: "Registered Voters" },
  { value: "57.41%", label: "Vote Share (2023)" },
  { value: "2023", label: "MLA Since" },
];

export default function FactStrip() {
  return (
    <section
      className="fact-strip"
      aria-label="Constituency overview"
      style={{ background: "var(--white)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="container-site">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              className="fact-item"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="fact-value">{fact.value}</span>
              <span className="fact-label">{fact.label}</span>
            </motion.div>
          ))}
          {/* Dividers between facts */}
        </div>
      </div>
    </section>
  );
}
