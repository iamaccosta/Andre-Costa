# Próximos Passos

## ✅ Graph View Expansion — Contact, Research & Development Branches (DONE)

### Topology

```
Hero ──┬── About
       ├── Experience
       ├── Contact
       ├── Research ──┬── ResearchProjects
       │              └── ResearchServices
       └── Development (hub) ──┬── WebDevelopment ──┬── WebDevProjects
                               │                    └── WebDevServices
                               └── MobileDevelopment ──┬── MobileDevProjects
                                                        └── MobileDevServices
```

- **DevelopmentHubNode** is a minimal fork card — no content, just routes to Web / Mobile as ghost choices.
- All other nodes are full content nodes with the morphing-blob pattern.

---

### New Node Components (`src/components/graph/`)

| File | Content |
|---|---|
| `ContactNode.jsx` | Port Contact.jsx — contact details + EmailJS form, two-column layout |
| `ResearchNode.jsx` | Research area overview: IIoT / Digital Twins / AAS, INESC TEC affiliation, tech tags |
| `ResearchProjectsNode.jsx` | Carousel of research projects (domain: Research + IoT from projectsData) |
| `ResearchServicesNode.jsx` | Research services: consulting, collaboration, prototyping |
| `DevelopmentHubNode.jsx` | Minimal fork node — two CTA tiles (Web Dev / Mobile Dev) |
| `WebDevelopmentNode.jsx` | Web dev overview: tagline, tech stack (React, Next.js, Node.js) |
| `WebDevProjectsNode.jsx` | Carousel of web projects (domain: Web, Fullstack) |
| `WebDevServicesNode.jsx` | Web services from existing servicesData |
| `MobileDevelopmentNode.jsx` | Mobile dev overview: tagline, tech stack (Kotlin, Android) |
| `MobileDevProjectsNode.jsx` | Carousel of mobile projects (GymNote + future) |
| `MobileDevServicesNode.jsx` | Mobile services: Android Dev, App Design |

---

### GraphView.jsx Changes

**Hero layout ghosts** (5 total):
```
About:       (87vw, 13vh)  ← keep
Experience:  (95vw, 90vh)  ← keep
Contact:     (13vw, 13vh)  ← new, top-left
Research:    ( 5vw, 55vh)  ← new, middle-left
Development: (50vw, 92vh)  ← new, bottom-center
```

**11 new layouts** following the existing `{ CenterComp, nodes, ghosts, edges }` pattern.  
Edge IDs: `center-{nodeKey}` — no changes to navigation logic needed.

---

### assets/index.js Additions

**`researchServicesData`** (new export):
- Digital Twin Consulting — AAS, IIoT, Industry 4.0
- Research Collaboration — Academic, R&D, Prototyping
- IIoT System Prototyping — MQTT, Kafka, Spring Boot

**`mobileServicesData`** (new export):
- Android Development — Kotlin, Android SDK
- Mobile App Design — UI/UX, Figma, Material You

---

### Implementation Order

1. `ContactNode` — standalone, no new data, easiest smoke test
2. Research branch — add `researchServicesData`, build ResearchNode + 2 children
3. `DevelopmentHubNode` — minimal fork, pure layout
4. Web branch — 3 nodes, reuses existing `servicesData`
5. Mobile branch — 3 nodes, add `mobileServicesData`

Each step: build components → add layouts to GraphView.jsx → verify orb navigation.

---

### Reusable Patterns

- Morphing blob wrapper: copy `BLOB_KEYFRAMES` + dual `motion.div` from `ExperienceNode.jsx`
- Entry animation: `initial={{ scale: 0.6, opacity: 0 }}` spring
- Carousel: copy structure from `ExperienceNode.jsx`
- Ghost label strings must match layout keys exactly
