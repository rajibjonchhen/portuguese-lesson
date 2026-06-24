

import { useState } from "react";
import { lessonData } from "./data/lessonData";
import { levelColors } from "./data/levelColor";
import { PERSONS } from "./data/persons";
import { TENSES } from "./data/tenses";


 
export default function PortugueseApp() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [activeTab, setActiveTab] = useState("verbs");
  const [selectedVerb, setSelectedVerb] = useState(0);
  const [tense, setTense] = useState("present");
  const [showTranslation, setShowTranslation] = useState({});
 
  const day = lessonData[selectedDay];
  const colors = levelColors[day.level];
  const verb = day.verbs[selectedVerb];
 
  const toggleTranslation = (i) => setShowTranslation(p => ({ ...p, [i]: !p[i] }));
 
  return (
    <div style={{ fontFamily:"'Georgia',serif", minHeight:"100vh", background:"#faf8f4", color:"#1a1a1a" }}>
      {/* ── Header ── */}
      <div style={{ background:"#1a1a2e", color:"#fff", padding:"18px 20px 0", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,.35)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <span style={{ fontSize:26 }}>🇵🇹</span>
          <div>
            <div style={{ fontSize:19, fontWeight:700, letterSpacing:1 }}>Português Vivo</div>
            <div style={{ fontSize:10, color:"#a0a0b0", letterSpacing:2, textTransform:"uppercase" }}>9-Day Immersive Course · A2 → B2</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:3, overflowX:"auto", paddingBottom:0 }}>
          {lessonData.map((d,i) => (
            <button key={i} onClick={() => { setSelectedDay(i); setSelectedVerb(0); setActiveTab("verbs"); setShowTranslation({}); }}
              style={{ padding:"7px 12px", border:"none", borderRadius:"7px 7px 0 0", cursor:"pointer", fontSize:11, fontWeight:700, whiteSpace:"nowrap",
                background: selectedDay===i ? "#faf8f4" : "transparent",
                color: selectedDay===i ? levelColors[d.level].accent : "#888",
                borderBottom: selectedDay===i ? `3px solid ${levelColors[d.level].accent}` : "3px solid transparent" }}>
              Day {d.day} <span style={{ fontSize:9, opacity:.8 }}>· {d.level}</span>
            </button>
          ))}
        </div>
      </div>
 
      <div style={{ maxWidth:960, margin:"0 auto", padding:"20px 14px" }}>
        {/* ── Day Header ── */}
        <div style={{ background:colors.bg, borderRadius:14, padding:"18px 20px", marginBottom:16, border:`1px solid ${colors.light}` }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:32 }}>{day.emoji}</span>
              <div>
                <div style={{ fontSize:20, fontWeight:700, color:colors.accent }}>{day.theme}</div>
                <div style={{ fontSize:13, color:"#555", fontStyle:"italic" }}>{day.themePortuguese}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <span style={{ background:colors.badge, color:"#fff", borderRadius:20, padding:"3px 12px", fontSize:12, fontWeight:700 }}>{day.level}</span>
              <span style={{ background:"#333", color:"#fff", borderRadius:20, padding:"3px 12px", fontSize:12 }}>Day {day.day} / 9</span>
            </div>
          </div>
          <div style={{ marginTop:8, fontSize:12, color:"#555" }}>
            📚 <strong>10 verbs</strong> · 5 persons: Eu · Tu · Ele/Ela/Você · Nós · Eles/Elas/Vocês · Present, Past & Future · Dialogue
          </div>
        </div>
 
        {/* ── Tab Nav ── */}
        <div style={{ display:"flex", gap:8, marginBottom:18 }}>
          {["verbs","dialogue"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding:"9px 22px", border:`2px solid ${activeTab===tab ? colors.accent : "#ddd"}`, borderRadius:30, cursor:"pointer",
                fontSize:13, fontWeight:600, background:activeTab===tab ? colors.accent : "#fff", color:activeTab===tab ? "#fff" : "#555", transition:"all .2s" }}>
              {tab==="verbs" ? "📖 Verb Conjugations" : "💬 Dialogue"}
            </button>
          ))}
        </div>
 
        {/* ── VERBS TAB ── */}
        {activeTab==="verbs" && (
          <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:14 }}>
            {/* Verb list */}
            <div style={{ background:"#fff", borderRadius:12, padding:10, border:"1px solid #eee", height:"fit-content" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#888", letterSpacing:1, textTransform:"uppercase", marginBottom:8, padding:"0 4px" }}>10 Verbs</div>
              {day.verbs.map((v,i) => (
                <button key={i} onClick={() => setSelectedVerb(i)}
                  style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"flex-start", padding:"9px 10px", marginBottom:3,
                    borderRadius:9, border:"none", cursor:"pointer", textAlign:"left",
                    background: selectedVerb===i ? colors.bg : "transparent",
                    borderLeft: selectedVerb===i ? `3px solid ${colors.accent}` : "3px solid transparent" }}>
                  <span style={{ fontWeight:700, fontSize:13, color:selectedVerb===i ? colors.accent : "#222" }}>{v.verb}</span>
                  <span style={{ fontSize:10, color:"#777", marginTop:1 }}>{v.meaning}</span>
                </button>
              ))}
            </div>
 
            {/* Verb detail */}
            <div>
              {/* Header */}
              <div style={{ background:"#fff", borderRadius:12, padding:"20px 22px", border:"1px solid #eee", marginBottom:14 }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:12 }}>
                  <h2 style={{ margin:0, fontSize:26, color:colors.accent, fontStyle:"italic" }}>{verb.verb}</h2>
                  <span style={{ fontSize:14, color:"#666" }}>{verb.meaning}</span>
                </div>
 
                {/* Tense selector */}
                <div style={{ display:"flex", gap:7, marginBottom:18 }}>
                  {TENSES.map(t => (
                    <button key={t.key} onClick={() => setTense(t.key)}
                      style={{ padding:"6px 16px", border:`2px solid ${tense===t.key ? colors.accent : "#ddd"}`, borderRadius:20, cursor:"pointer",
                        fontSize:12, fontWeight:600, background:tense===t.key ? colors.accent : "#fff", color:tense===t.key ? "#fff" : "#555" }}>
                      {t.label}
                    </button>
                  ))}
                </div>
 
                {/* 5-person conjugation cards */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
                  {PERSONS.map(p => (
                    <div key={p.key} style={{ background:colors.bg, borderRadius:10, padding:"12px 14px", border:`1px solid ${colors.light}`,
                      gridColumn: p.key==="nos" ? "1" : p.key==="eles" ? "2" : "auto" }}>
                      <div style={{ fontSize:10, color:"#777", fontWeight:700, textTransform:"uppercase", letterSpacing:.4, marginBottom:2 }}>{p.sub}</div>
                      <div style={{ fontSize:13, color:"#888", marginBottom:3 }}>{p.label}</div>
                      <div style={{ fontSize:18, fontWeight:700, color:colors.accent }}>{verb.conjugations[tense][p.key]}</div>
                    </div>
                  ))}
                </div>
 
                {/* Example */}
                <div style={{ background:"#f8f8f0", borderRadius:10, padding:"13px 16px", borderLeft:`4px solid ${colors.accent}` }}>
                  <div style={{ fontSize:11, color:"#888", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:5 }}>Example</div>
                  <div style={{ fontSize:16, fontStyle:"italic", color:"#1a1a1a", marginBottom:3 }}>"{verb.example}"</div>
                  <div style={{ fontSize:12, color:"#666" }}>→ {verb.exampleEN}</div>
                </div>
              </div>
 
              {/* Full table – all tenses × all persons */}
              <div style={{ background:"#fff", borderRadius:12, padding:"18px 20px", border:"1px solid #eee" }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Complete Conjugation Table</div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                      <tr style={{ background:colors.bg }}>
                        <th style={{ padding:"9px 10px", textAlign:"left", color:colors.accent, fontWeight:700, minWidth:150 }}>Person</th>
                        <th style={{ padding:"9px 10px", textAlign:"left", color:colors.accent, fontWeight:700 }}>Presente</th>
                        <th style={{ padding:"9px 10px", textAlign:"left", color:colors.accent, fontWeight:700 }}>Passado</th>
                        <th style={{ padding:"9px 10px", textAlign:"left", color:colors.accent, fontWeight:700 }}>Futuro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PERSONS.map((p,idx) => (
                        <tr key={p.key} style={{ background:idx%2===0 ? "#fafafa" : "#fff" }}>
                          <td style={{ padding:"9px 10px" }}>
                            <div style={{ fontWeight:700, color:"#333", fontSize:12 }}>{p.label}</div>
                            <div style={{ fontSize:10, color:"#999" }}>{p.sub}</div>
                          </td>
                          <td style={{ padding:"9px 10px", color:"#1a1a1a", fontWeight:600 }}>{verb.conjugations.present[p.key]}</td>
                          <td style={{ padding:"9px 10px", color:"#1a1a1a", fontWeight:600 }}>{verb.conjugations.past[p.key]}</td>
                          <td style={{ padding:"9px 10px", color:"#1a1a1a", fontWeight:600 }}>{verb.conjugations.future[p.key]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
 
        {/* ── DIALOGUE TAB ── */}
        {activeTab==="dialogue" && (
          <div style={{ background:"#fff", borderRadius:12, padding:"22px 20px", border:"1px solid #eee" }}>
            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:11, color:"#888", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>Diálogo · Dialogue</div>
              <h3 style={{ margin:0, fontSize:20, color:colors.accent }}>{day.dialogue.title}</h3>
              <div style={{ fontSize:12, color:"#777", marginTop:4 }}>Tap any bubble to reveal the English translation</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
              {day.dialogue.lines.map((line,i) => {
                const isLeft = i%2===0;
                return (
                  <div key={i} style={{ display:"flex", flexDirection:isLeft?"row":"row-reverse", gap:9, alignItems:"flex-start" }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", flexShrink:0,
                      background:isLeft ? colors.accent : "#555",
                      display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:12 }}>
                      {line.speaker[0]}
                    </div>
                    <div style={{ maxWidth:"76%" }}>
                      <div style={{ fontSize:10, color:"#888", fontWeight:700, marginBottom:3, textAlign:isLeft?"left":"right" }}>{line.speaker}</div>
                      <div onClick={() => toggleTranslation(i)}
                        style={{ background:isLeft ? colors.bg : "#f5f5f5", border:`1px solid ${isLeft ? colors.light : "#e0e0e0"}`,
                          borderRadius:isLeft?"4px 13px 13px 13px":"13px 4px 13px 13px", padding:"11px 14px", cursor:"pointer" }}>
                        <div style={{ fontSize:14, color:"#1a1a1a", fontStyle:"italic" }}>{line.text}</div>
                        {showTranslation[i] && (
                          <div style={{ marginTop:7, paddingTop:7, borderTop:"1px dashed #ccc", fontSize:12, color:"#555" }}>
                            🇬🇧 {line.translation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Verb chips */}
            <div style={{ marginTop:22, padding:14, background:"#f8f8f0", borderRadius:10 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:1, marginBottom:9 }}>Verbs from this lesson — click to review</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {day.verbs.map((v,i) => (
                  <span key={i} onClick={() => { setActiveTab("verbs"); setSelectedVerb(i); }}
                    style={{ background:colors.bg, border:`1px solid ${colors.light}`, borderRadius:20, padding:"4px 12px",
                      fontSize:12, cursor:"pointer", color:colors.accent, fontWeight:600 }}>
                    {v.verb}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* ── Progress Bar ── */}
        <div style={{ marginTop:16, background:"#fff", borderRadius:10, padding:"13px 16px", border:"1px solid #eee" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
            <span style={{ fontSize:12, fontWeight:600, color:"#555" }}>Course Progress</span>
            <span style={{ fontSize:12, color:colors.accent, fontWeight:700 }}>Day {day.day} / 9 · {Math.round((day.day/9)*100)}%</span>
          </div>
          <div style={{ background:"#f0f0f0", borderRadius:10, height:7, overflow:"hidden" }}>
            <div style={{ width:`${(day.day/9)*100}%`, height:"100%", background:`linear-gradient(90deg,#2e7d32,${colors.accent})`, borderRadius:10 }} />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:10, color:"#999" }}>
            <span>A2 Beginner</span><span>B1 Intermediate</span><span>B2 Upper-Int.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 
