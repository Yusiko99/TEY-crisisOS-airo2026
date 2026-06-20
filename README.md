# CrisisOS AI

**AI-Powered Cyber Incident Response Platform for Smart Cities & Organizations**

![CrisisOS AI OG Image](docs/og-image.png)

CrisisOS AI kiberinsident zamanı təşkilatlarda yaranan xaosu idarə olunan, sənədləşdirilmiş və ölçülə bilən cavab prosesinə çevirən müdafiə yönümlü kibertəhlükəsizlik MVP-sidir.

Platforma insidenti qəbul edir, AI triage məntiqi ilə analiz edir, risk balı hesablayır, cavab playbook-u yaradır, komanda rollarına tapşırıqlar təyin edir, sübutları toplayır və yekunda avtomatik insident hesabatı yaradır.

---

## Hakaton Məlumatları

| Bölmə | Məlumat |
|---|---|
| Layihə adı | CrisisOS AI |
| Hakaton | AIRO2026 |
| Seçilmiş tapşırıq | Tapşırıq 4 — Ağıllı şəhər insident cavab idarəetmə sistemi |
| Məhsul tipi | Cyber Incident Response Management Platform |
| Yanaşma | Müdafiə yönümlü, qanuni və simulyasiya edilmiş data əsaslı |
---

## Komanda Məlumatları

> Aşağıdakı hissəni təqdimatdan əvvəl doldurun.

| Rol | Ad |
|---|---|
| Komanda adı | TEY |
| Komanda lideri | Yusif Allahverdiyev |
| Üzv 1 | Elşən Hacımuradov |
| Üzv 2 | Tələt Rzayev |

---

## Problem

Təşkilatlarda, kiçik və ya orta bizneslərdə, ağıllı şəhərlərdə kiberinsident baş verdikdə ən böyük problem təkcə texniki hücum deyil, həm də cavab prosesinin xaotik olmasıdır.

Çox vaxt komandalar bu suallara gec cavab tapırlar:

- İnsidentin prioriteti nədir?
- Hansı xidmət təsirlənib?
- Kim cavabdehdir?
- İlk 15 dəqiqədə hansı addımlar atılmalıdır?
- Hansı sübutlar qorunmalıdır?
- Yekun hesabat necə hazırlanmalıdır?

Bu gecikmə xidmət dayanması, vətəndaş məlumatlarının riskə düşməsi, reputasiya itkisi və maliyyə zərəri yarada bilər.

---

## Həll

**CrisisOS AI** ağıllı şəhər və təşkilatlar üçün AI əsaslı agentic işçi kimi işləyir.

Sistem:

1. Kiberinsidenti qeydiyyata alır.
2. İnsident təsvirini analiz edir.
3. Risk balı və severity hesablayır.
4. Uyğun cavab playbook-u təklif edir.
5. Komanda rollarına tapşırıqlar yaradır.
6. Timeline və status prosesini izləyir.
7. Evidence Vault-da sübutları saxlayır.
8. Final incident report yaradır.
9. Demo/training üçün təhlükəsiz simulyasiya ssenariləri təqdim edir.

---

## Əsas Funksiyalar

### 1. Dashboard

- Açıq insidentlərin sayı
- Yüksək riskli insidentlər
- Bu gün həll olunan insidentlər
- Orta cavab müddəti
- Təsirlənmiş xidmətlər
- Risk trend chart
- Alert activity feed
- Recent incidents table
- Risk score gauge

### 2. AI Triage

İstifadəçi insident təsvirini daxil edir və sistem avtomatik nəticə yaradır:

- Incident type
- Severity
- Risk score
- Potential impact
- Recommended team roles
- Recommended playbook
- First 15-minute actions
- Confidence level

### 3. Attack Surface

Ağıllı şəhər xidmətləri üzrə risk görünüşü:

- Total threats
- Payment API risk
- Citizen data risk
- Service outage risk
- Security score bars
- Permissions view
- Service/workload overview

### 4. Incident Detail

Hər insident üçün vahid idarəetmə səhifəsi:

- Incident summary
- Risk score
- Status tracker
- Recommended playbook
- Assigned team
- Timeline
- Tasks
- Evidence
- Reports

### 5. Timeline & Tasks

- Hadisələrin xronoloji ardıcıllığı
- Kanban task board
- Statuslar: Open, In Progress, Monitoring, Resolved
- Komanda üzvlərinə tapşırıq təyinatı

### 6. Evidence Vault

- Log faylları
- Screenshot-lar
- Notes
- Attachments
- Hash/integrity göstəricisi
- Role-based evidence access konsepti

### 7. Reports

- Avtomatik final incident report
- Summary
- Actions taken
- Impact assessment
- Timeline
- Recommendations
- Export/copy funksiyası

### 8. Simulation Center

Təhlükəsiz demo və təlim ssenariləri:

- Smart Parking Payment Attack
- Citizen Data Leak Suspicion
- Public Camera Network Offline
- Ransomware Suspicion
- Suspicious Admin Login

---

## Sistem Arxitekturası

```mermaid
flowchart LR
    A[Incident Input] --> B[AI Triage Engine]
    B --> C[Risk Scoring]
    C --> D[Playbook Generator]
    D --> E[Task Assignment]
    D --> F[Evidence Vault]
    D --> G[Timeline Tracker]
    E --> H[Incident Detail Workspace]
    F --> H
    G --> H
    H --> I[Final Report Generator]
    I --> J[Export / Share Report]

    style A fill:#1c1024,stroke:#C871DA,color:#fff
    style B fill:#10212a,stroke:#22D3EE,color:#fff
    style C fill:#2a1018,stroke:#F43F5E,color:#fff
    style D fill:#1c1024,stroke:#C871DA,color:#fff
    style I fill:#10212a,stroke:#22D3EE,color:#fff
```

---

## İnsident Cavab Dövrü

```mermaid
stateDiagram-v2
    [*] --> Detected
    Detected --> Triage
    Triage --> Containment
    Containment --> Eradication
    Eradication --> Recovery
    Recovery --> Resolved
    Resolved --> [*]

    Detected: Incident detected
    Triage: AI risk analysis
    Containment: Limit impact
    Eradication: Remove root cause
    Recovery: Restore service
    Resolved: Final report generated
```

---

## AI Triage Məntiqi

MVP real AI API tələb etmədən lokal/mock triage engine istifadə edir. Məqsəd demo zamanı stabil və izah edilə bilən nəticə verməkdir.

```mermaid
flowchart TD
    A[Incident Description] --> B{Keyword Analysis}
    B --> C[Service Impact Score]
    B --> D[Security Risk Score]
    B --> E[Citizen/Data Impact Score]
    B --> F[Severity Modifier]
    C --> G[Final Risk Score]
    D --> G
    E --> G
    F --> G
    G --> H{Severity Level}
    H -->|0-30| I[Low]
    H -->|31-65| J[Medium]
    H -->|66-85| K[High]
    H -->|86-100| L[Critical]
    H --> M[Recommended Playbook]
    M --> N[First Response Actions]

    style A fill:#111,stroke:#C871DA,color:#fff
    style G fill:#2a1018,stroke:#F43F5E,color:#fff
    style M fill:#10212a,stroke:#22D3EE,color:#fff
```

### Risk Score Pseudo Logic

```ts
function triageIncident(text: string, service: string, severity: string) {
  let score = 20;

  if (contains(text, ["payment", "transaction", "gateway", "parking"])) score += 25;
  if (contains(text, ["failed login", "credential", "admin"])) score += 20;
  if (contains(text, ["data", "citizen records", "leak", "database"])) score += 30;
  if (contains(text, ["ransomware", "encrypted", "malware"])) score += 35;
  if (contains(text, ["offline", "camera", "heartbeat"])) score += 15;

  if (severity === "Critical") score += 20;
  if (severity === "High") score += 15;

  return Math.min(score, 100);
}
```

---

## Playbook Workflow

```mermaid
flowchart LR
    A[Detect] --> B[Analyze]
    B --> C[Assign Roles]
    C --> D[Contain]
    D --> E[Collect Evidence]
    E --> F[Monitor Recovery]
    F --> G[Generate Report]

    A:::step
    B:::ai
    C:::step
    D:::danger
    E:::step
    F:::ai
    G:::report

    classDef step fill:#1c1024,stroke:#C871DA,color:#fff
    classDef ai fill:#10212a,stroke:#22D3EE,color:#fff
    classDef danger fill:#2a1018,stroke:#F43F5E,color:#fff
    classDef report fill:#101c14,stroke:#22C55E,color:#fff
```
---

## Data Flow

```mermaid
flowchart TB
    A[Mock Incident Data] --> D[Application State]
    B[Mock Evidence Data] --> D
    C[Mock Team & Playbook Data] --> D
    D --> E[Dashboard Metrics]
    D --> F[Incident Detail]
    D --> G[Task Board]
    D --> H[Evidence Vault]
    D --> I[Report Generator]
    I --> J[Markdown / Text Export]

    style D fill:#111827,stroke:#C871DA,color:#fff
    style E fill:#0A0A0A,stroke:#22D3EE,color:#fff
    style I fill:#0A0A0A,stroke:#F43F5E,color:#fff
```

---

## İstifadəçi Rolları

```mermaid
flowchart TD
    A[Incident Commander] --> B[Security Lead]
    A --> C[Backend Engineer]
    A --> D[Network Engineer]
    A --> E[Communication Lead]
    A --> F[Legal / Admin]
    A --> G[Evidence Custodian]

    B --> H[Risk validation]
    C --> I[Application/API checks]
    D --> J[Network traffic review]
    E --> K[Stakeholder updates]
    F --> L[Compliance notes]
    G --> M[Evidence integrity]

    style A fill:#1c1024,stroke:#C871DA,color:#fff
    style B fill:#10212a,stroke:#22D3EE,color:#fff
    style C fill:#10212a,stroke:#22D3EE,color:#fff
    style D fill:#10212a,stroke:#22D3EE,color:#fff
    style E fill:#2a1018,stroke:#F43F5E,color:#fff
```

---

## Texnologiya Steki

| Sahə | Texnologiya |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Boxicons |
| State | React state / localStorage / Zustand |
| Data | Local mock JSON/TypeScript data |
| Report | Markdown/Text generator |
| Deployment | Vercel / Netlify / Local demo |

---

## Rəng Sistemi

Layihədə istifadə olunan əsas rənglər:

| Token | Rəng |
|---|---|
| Primary | `#C871DA` |
| Secondary | `#22D3EE` |
| Tertiary / Danger | `#F43F5E` |
| Neutral Background | `#0A0A0A` |

```css
:root {
  --primary: #C871DA;
  --secondary: #22D3EE;
  --tertiary: #F43F5E;
  --neutral-bg: #0A0A0A;
}
```
---

## Quraşdırma

### 1. Repository-ni klonlayın

```bash
git clone https://github.com/Yusiko99/TEY-crisisOS-airo2026.git
cd TEY-crisisOS-airo2026
```

### 2. Dependencies quraşdırın

```bash
npm install
```

### 3. Development server başladın

```bash
npm run dev
```

### 4. Brauzerdə açın

```txt
http://localhost:3000
```

---

> MVP-də autentifikasiya real security layer kimi yox, demo giriş axını kimi istifadə olunur.

---

## Nümunə Ssenarilər

### Scenario 1 — Smart Parking Payment Attack

```txt
Smart Parking payment gateway is failing. Users cannot complete parking payments.
Multiple timeout errors and suspicious API traffic are detected.
```

Expected result:

```txt
Severity: High
Risk Score: 92/100
Recommended Playbook: Payment Service Outage Response
Recommended Roles: Security Lead, Backend Engineer, Network Engineer, Communication Lead
```

### Scenario 2 — Citizen Data Leak Suspicion

```txt
Unusual API access detected from an admin account.
Large number of citizen records were requested in a short period.
```

Expected result:

```txt
Severity: Critical
Risk Score: 96/100
Recommended Playbook: Citizen Data Leak Suspicion
Recommended Roles: Security Lead, Legal/Admin, Evidence Custodian
```

### Scenario 3 — Public Camera Network Offline

```txt
Several public camera nodes went offline at the same time.
Last heartbeat is missing from 12 camera devices.
```

Expected result:

```txt
Severity: Medium / High
Risk Score: 74/100
Recommended Playbook: Public Camera Network Offline
```

---

## Sample Data

Root `data/` qovluğunda ekspert yoxlaması üçün simulyasiya edilmiş nümunə data yerləşdirilir:

```txt
data/
├── sample-incidents.csv
├── sample-evidence.csv
└── simulated-logs.json
```

Bu data real sistemlərdən götürülməyib və yalnız demo məqsədilə yaradılıb.

---

## Təhlükəsizlik və Etik Bəyanat

CrisisOS AI yalnız müdafiə yönümlü kibertəhlükəsizlik həllidir.

Bu MVP:

- Real sistemlərə hücum etmir.
- Üçüncü tərəf şəbəkələrini skan etmir.
- Exploit və ya zərərli kod icra etmir.
- İstifadəçi və vətəndaş məlumatlarını toplamır.
- Bütün insidentləri və logları simulyasiya edilmiş data üzərində göstərir.
- Məqsəd təşkilatların insidentlərə daha sürətli və koordinasiyalı cavab verməsinə kömək etməkdir.

---

## Məhdudiyyətlər

Bu layihə hackathon MVP-sidir və aşağıdakı məhdudiyyətlərə malikdir:

- Real SIEM inteqrasiyası yoxdur.
- Real-time production monitoring yoxdur.
- AI triage mock/deterministic qaydalarla işləyir.
- Evidence upload demo məqsədlidir.
- PDF export sadələşdirilmiş ola bilər.
- Multi-tenant enterprise access control tam tətbiq olunmaya bilər.

---
