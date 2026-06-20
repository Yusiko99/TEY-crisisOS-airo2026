export type Severity = "Low" | "Medium" | "High" | "Critical";
export type IncidentStatus =
  | "Detected"
  | "Triage"
  | "Containment"
  | "Eradication"
  | "Recovery"
  | "Resolved";

export type Incident = {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: Severity;
  riskScore: number;
  affectedService: string;
  status: IncidentStatus;
  reportedBy: string;
  detectedAt: string;
  assignedTo: string[];
  playbookId: string;
  impact: string;
};

export type Task = {
  id: string;
  incidentId: string;
  title: string;
  assignedTo: string;
  priority: Severity;
  dueTime: string;
  status: "Open" | "In Progress" | "Monitoring" | "Resolved";
};

export type Evidence = {
  id: string;
  incidentId: string;
  name: string;
  type: "Log" | "Screenshot" | "File" | "Note";
  source: string;
  collectedAt: string;
  collectedBy: string;
  hash: string;
};

export type Playbook = {
  id: string;
  title: string;
  severityRange: Severity[];
  estimatedTime: string;
  roles: string[];
  steps: string[];
  evidenceToCollect: string[];
  communicationTemplate: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "Available" | "Busy" | "Assigned";
};

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: "INC-2026-001",
    title: "Smart Parking Payment Attack",
    description: "Multiple transaction timeouts detected on the payment gateway.",
    type: "Payment API Abuse",
    severity: "High",
    riskScore: 92,
    affectedService: "Smart Parking System",
    status: "Containment",
    reportedBy: "System",
    detectedAt: "2026-05-21T10:18:00Z",
    assignedTo: ["Rohan Mehta", "Arjun Nair"],
    playbookId: "PB-001",
    impact: "Citizen payment disruption, failed transactions"
  },
  {
    id: "INC-2026-002",
    title: "Citizen Data Leak Suspicion",
    description: "Unusual data access patterns on citizen records database.",
    type: "Data Leak",
    severity: "Critical",
    riskScore: 98,
    affectedService: "Citizen Portal",
    status: "Triage",
    reportedBy: "Admin",
    detectedAt: "2026-05-21T09:12:00Z",
    assignedTo: ["Meera Shah"],
    playbookId: "PB-002",
    impact: "Reputational risk, compliance violation"
  },
  {
    id: "INC-2026-003",
    title: "Public Camera Network Offline",
    description: "Loss of heartbeat from edge nodes in sector 4.",
    type: "Availability",
    severity: "Medium",
    riskScore: 65,
    affectedService: "Public Camera Network",
    status: "Resolved",
    reportedBy: "System",
    detectedAt: "2026-05-21T08:05:00Z",
    assignedTo: ["Karthik Iyer"],
    playbookId: "PB-003",
    impact: "Loss of visibility in sector 4"
  },
  {
    id: "INC-2026-004",
    title: "Ransomware Suspicion",
    description: "Multiple encrypted files detected on Finance System share.",
    type: "Malware",
    severity: "High",
    riskScore: 88,
    affectedService: "Finance System",
    status: "Detected",
    reportedBy: "Endpoint Agent",
    detectedAt: "2026-05-21T11:45:00Z",
    assignedTo: ["Sneha Desai"],
    playbookId: "PB-004",
    impact: "Loss of financial data access"
  },
  {
    id: "INC-2026-005",
    title: "Phishing Campaign Detected",
    description: "Several employees reported suspicious emails.",
    type: "Phishing",
    severity: "Low",
    riskScore: 35,
    affectedService: "Email Gateway",
    status: "Resolved",
    reportedBy: "User",
    detectedAt: "2026-05-20T14:20:00Z",
    assignedTo: ["Aylin Karimova"],
    playbookId: "PB-005",
    impact: "Potential credential theft"
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: "TSK-001",
    incidentId: "INC-2026-001",
    title: "Validate error rates and scope",
    assignedTo: "Rohan Mehta",
    priority: "High",
    dueTime: "10:30 AM",
    status: "Resolved"
  },
  {
    id: "TSK-002",
    incidentId: "INC-2026-001",
    title: "Isolate payment gateway",
    assignedTo: "Arjun Nair",
    priority: "Critical",
    dueTime: "10:45 AM",
    status: "In Progress"
  },
  {
    id: "TSK-003",
    incidentId: "INC-2026-001",
    title: "Check WAF logs",
    assignedTo: "Rohan Mehta",
    priority: "High",
    dueTime: "11:00 AM",
    status: "Open"
  }
];

export const MOCK_EVIDENCE: Evidence[] = [
  {
    id: "EVD-001",
    incidentId: "INC-2026-001",
    name: "payment-gateway-error.log",
    type: "Log",
    source: "PAY-GW-01",
    collectedAt: "10:35 AM",
    collectedBy: "Rohan Mehta",
    hash: "a2b4c6d8"
  },
  {
    id: "EVD-002",
    incidentId: "INC-2026-001",
    name: "waf-blocked-requests.log",
    type: "Log",
    source: "WAF-EDGE",
    collectedAt: "10:32 AM",
    collectedBy: "Karthik Iyer",
    hash: "f1e2d3c4"
  },
  {
    id: "EVD-003",
    incidentId: "INC-2026-001",
    name: "api-timeout-errors.png",
    type: "Screenshot",
    source: "APM Dashboard",
    collectedAt: "10:28 AM",
    collectedBy: "Rohan Mehta",
    hash: "b5a6c7d8"
  }
];

export const MOCK_PLAYBOOKS: Playbook[] = [
  {
    id: "PB-001",
    title: "Payment Service Outage Response",
    severityRange: ["High", "Critical"],
    estimatedTime: "45 mins",
    roles: ["Security Lead", "Network Engineer"],
    steps: [
      "Validate the scope and impact of payment failure",
      "Isolate affected payment gateway instances",
      "Check WAF/API Gateway logs for suspicious traffic",
      "Engage payment processor for incident status",
      "Communicate status update to stakeholders",
      "Monitor recovery and verify service functionality"
    ],
    evidenceToCollect: ["Gateway Logs", "WAF Logs", "Dashboard Screenshots"],
    communicationTemplate: "We are currently investigating a potential disruption affecting the Smart Parking payment gateway."
  }
];

export const MOCK_TEAM: TeamMember[] = [
  {
    id: "TM-001",
    name: "Arjun Nair",
    role: "Incident Commander",
    avatar: "AN",
    status: "Busy"
  },
  {
    id: "TM-002",
    name: "Rohan Mehta",
    role: "Security Lead",
    avatar: "RM",
    status: "Assigned"
  },
  {
    id: "TM-003",
    name: "Meera Shah",
    role: "Communication Lead",
    avatar: "MS",
    status: "Available"
  }
];
