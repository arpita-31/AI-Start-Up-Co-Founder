"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [market, setMarket] = useState("");

  const [research, setResearch] = useState("");
  const [business, setBusiness] = useState("");
  const [product, setProduct] = useState("");
  const [pitch, setPitch] = useState("");

  const [businessPlanPdf, setBusinessPlanPdf] = useState("");
  const [swotPdf, setSwotPdf] = useState("");
  const [roadmapPdf, setRoadmapPdf] = useState("");
  const [pitchDeck, setPitchDeck] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedOutputs, setSelectedOutputs] = useState({
    businessPlan: true,
    swot: true,
    roadmap: true,
    pitch: true,
  });

  const runResearch = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
          market,
          selectedOutputs,
        }),
      });

      const data = await response.json();

      setResearch(data.research || "");
      setBusiness(data.business || "");
      setProduct(data.product || "");
      setPitch(data.pitch || "");

      setBusinessPlanPdf(data.businessPlanPdf || "");
      setSwotPdf(data.swotPdf || "");
      setRoadmapPdf(data.roadmapPdf || "");
      setPitchDeck(data.pitchDeck || "");
    } catch (error) {
      console.error(error);
      alert("Error generating reports");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          padding: "20px 40px",
          borderBottom: "1px solid #1e293b",
          background: "#061126",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "34px",
          }}
        >
           AI Startup Co-Founder
        </h1>

        <p
          style={{
            color: "#3068b8",
            marginTop: 5,
          }}
        >
          Multi-Agent Strategic Workspace
        </p>
      </div>

      {/* MAIN */}

      <div
        style={{
          display: "flex",
          gap: "30px",
          padding: "30px",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT PANEL */}

        <div
          style={{
            width: "420px",
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
            border: "1px solid #1e293b",
          }}
        >
          <h2>Configure Engine Analysis</h2>

          <p>Startup Concept Description</p>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup..."
            rows={6}
            style={{
              width: "100%",
              padding: "14px",
              background: "#172036",
              color: "white",
              border: "1px solid #374151",
              borderRadius: "12px",
            }}
          />

          <p style={{ marginTop: 20 }}>
            Target Market Location
          </p>

          <input
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="India"
            style={{
              width: "100%",
              padding: "14px",
              background: "#172036",
              color: "white",
              border: "1px solid #374151",
              borderRadius: "12px",
            }}
          />

          <div
            style={{
              marginTop: 25,
              padding: "20px",
              background: "#111827",
              borderRadius: "12px",
              border: "1px solid #374151",
            }}
          >
            <h3>Select Desired Outputs</h3>

            <div style={{ marginTop: 15 }}>
              <label>
                <input
                  type="checkbox"
                  checked={
                    selectedOutputs.businessPlan
                  }
                  onChange={() =>
                    setSelectedOutputs({
                      ...selectedOutputs,
                      businessPlan:
                        !selectedOutputs.businessPlan,
                    })
                  }
                />
                {" "}PDF Business Plan
              </label>
            </div>

            <div style={{ marginTop: 10 }}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOutputs.swot}
                  onChange={() =>
                    setSelectedOutputs({
                      ...selectedOutputs,
                      swot:
                        !selectedOutputs.swot,
                    })
                  }
                />
                {" "}SWOT Report
              </label>
            </div>

            <div style={{ marginTop: 10 }}>
              <label>
                <input
                  type="checkbox"
                  checked={
                    selectedOutputs.roadmap
                  }
                  onChange={() =>
                    setSelectedOutputs({
                      ...selectedOutputs,
                      roadmap:
                        !selectedOutputs.roadmap,
                    })
                  }
                />
                {" "}MVP Roadmap
              </label>
            </div>

            <div style={{ marginTop: 10 }}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOutputs.pitch}
                  onChange={() =>
                    setSelectedOutputs({
                      ...selectedOutputs,
                      pitch:
                        !selectedOutputs.pitch,
                    })
                  }
                />
                {" "}Investor Pitch Deck
              </label>
            </div>
          </div>

          <button
            onClick={runResearch}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "18px",
              borderRadius: "12px",
              border: "none",
              background: "#4f46e5",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Generating..."
              : "Execute Agent Evaluation"}
          </button>
        </div>

        {/* RIGHT PANEL */}

        <div
          style={{
            flex: 1,
          }}
        >
          {!research ? (
            <div
              style={{
                background: "#0f172a",
                borderRadius: "20px",
                padding: "80px",
                textAlign: "center",
                border: "1px solid #1e293b",
              }}
            >
              <h2>Analytical Engine Standby</h2>

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                Enter startup details and execute
                analysis.
              </p>
            </div>
          ) : (
            <>
              <h1>
                Compiled Deliverables Dashboard
              </h1>

              {selectedOutputs.businessPlan && (
                <div
                  style={{
                    background: "#111827",
                    padding: "20px",
                    borderRadius: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                    }}
                  >
                    <h2>
                      1. Executive Business Plan
                    </h2>

                    <a
                      href={businessPlanPdf}
                      download
                      style={{
                        color: "#818cf8",
                      }}
                    >
                      Download PDF
                    </a>
                  </div>

                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {business}
                  </pre>
                </div>
              )}

              {selectedOutputs.swot && (
                <div
                  style={{
                    background: "#111827",
                    padding: "20px",
                    borderRadius: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                    }}
                  >
                    <h2>2. SWOT Report</h2>

                    <a
                      href={swotPdf}
                      download
                      style={{
                        color: "#818cf8",
                      }}
                    >
                      Download PDF
                    </a>
                  </div>

                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {business}
                  </pre>
                </div>
              )}

              {selectedOutputs.roadmap && (
                <div
                  style={{
                    background: "#111827",
                    padding: "20px",
                    borderRadius: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                    }}
                  >
                    <h2>3. MVP Roadmap</h2>

                    <a
                      href={roadmapPdf}
                      download
                      style={{
                        color: "#818cf8",
                      }}
                    >
                      Download PDF
                    </a>
                  </div>

                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {product}
                  </pre>
                </div>
              )}

              {selectedOutputs.pitch && (
                <div
                  style={{
                    background: "#111827",
                    padding: "20px",
                    borderRadius: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                    }}
                  >
                    <h2>
                      4. Investor Pitch Deck
                    </h2>

                    <a
                      href={pitchDeck}
                      download
                      style={{
                        color: "#818cf8",
                      }}
                    >
                      Download PPTX
                    </a>
                  </div>

                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {pitch}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}