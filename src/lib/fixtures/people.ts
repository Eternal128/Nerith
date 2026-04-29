import type { Person } from '@/types'

export const PEOPLE: Person[] = [
  // Founders
  { id: 'person-001', name: 'Marcus Hartwell', email: 'marcus@hartwellrobotics.com', role: 'CEO & Co-founder', team: 'Founders', slackHandle: 'marcus', githubHandle: 'mhartwell', linearHandle: 'marcus' },
  { id: 'person-002', name: 'Priya Nair', email: 'priya@hartwellrobotics.com', role: 'CTO & Co-founder', team: 'Founders', slackHandle: 'priya', githubHandle: 'priya-nair', linearHandle: 'priya' },
  { id: 'person-003', name: 'Daniel Osei', email: 'daniel@hartwellrobotics.com', role: 'CPO & Co-founder', team: 'Founders', slackHandle: 'daniel', githubHandle: 'doseidev', linearHandle: 'daniel' },

  // Engineering (24)
  { id: 'person-004', name: 'Sarah Chen', email: 'sarah@hartwellrobotics.com', role: 'Staff Engineer', team: 'Platform', slackHandle: 'sarah', githubHandle: 'schen-hw', linearHandle: 'sarah' },
  { id: 'person-005', name: 'Alex Kowalski', email: 'alex@hartwellrobotics.com', role: 'Senior Engineer', team: 'Platform', slackHandle: 'alex', githubHandle: 'akowalski', linearHandle: 'alex' },
  { id: 'person-006', name: 'Tanvir Rahman', email: 'tanvir@hartwellrobotics.com', role: 'Senior Engineer', team: 'Auth', slackHandle: 'tanvir', githubHandle: 'trahman', linearHandle: 'tanvir' },
  { id: 'person-007', name: 'Mei Liu', email: 'mei@hartwellrobotics.com', role: 'Engineer', team: 'Auth', slackHandle: 'mei', githubHandle: 'meiliu', linearHandle: 'mei' },
  { id: 'person-008', name: 'James Okafor', email: 'james@hartwellrobotics.com', role: 'Engineer', team: 'Billing', slackHandle: 'james', githubHandle: 'jokafor', linearHandle: 'james' },
  { id: 'person-009', name: 'Nina Petrov', email: 'nina@hartwellrobotics.com', role: 'Senior Engineer', team: 'Billing', slackHandle: 'nina', githubHandle: 'npetrov', linearHandle: 'nina' },
  { id: 'person-010', name: 'Raj Sharma', email: 'raj@hartwellrobotics.com', role: 'Staff Engineer', team: 'Telemetry', slackHandle: 'raj', githubHandle: 'rsharma-hw', linearHandle: 'raj' },
  { id: 'person-011', name: 'Elena Vasquez', email: 'elena@hartwellrobotics.com', role: 'Senior Engineer', team: 'Telemetry', slackHandle: 'elena', githubHandle: 'evasquez', linearHandle: 'elena' },
  { id: 'person-012', name: 'Kwame Mensah', email: 'kwame@hartwellrobotics.com', role: 'Engineer', team: 'Telemetry', slackHandle: 'kwame', githubHandle: 'kmensah', linearHandle: 'kwame' },
  { id: 'person-013', name: 'Fatima Al-Rashid', email: 'fatima@hartwellrobotics.com', role: 'Senior Engineer', team: 'Mobile', slackHandle: 'fatima', githubHandle: 'falrashid', linearHandle: 'fatima' },
  { id: 'person-014', name: 'Diego Morales', email: 'diego@hartwellrobotics.com', role: 'Engineer', team: 'Mobile', slackHandle: 'diego', githubHandle: 'dmorales', linearHandle: 'diego' },
  { id: 'person-015', name: 'Yuki Tanaka', email: 'yuki@hartwellrobotics.com', role: 'Staff Engineer', team: 'Security', slackHandle: 'yuki', githubHandle: 'ytanaka', linearHandle: 'yuki' },
  { id: 'person-016', name: 'Arjun Patel', email: 'arjun@hartwellrobotics.com', role: 'Senior Engineer', team: 'Security', slackHandle: 'arjun', githubHandle: 'apatel-hw', linearHandle: 'arjun' },
  { id: 'person-017', name: 'Sofia Andersen', email: 'sofia@hartwellrobotics.com', role: 'Engineer', team: 'Platform', slackHandle: 'sofia', githubHandle: 'sandersen', linearHandle: 'sofia' },
  { id: 'person-018', name: 'Hassan Ibrahim', email: 'hassan@hartwellrobotics.com', role: 'Engineer', team: 'Platform', slackHandle: 'hassan', githubHandle: 'hibrahim', linearHandle: 'hassan' },
  { id: 'person-019', name: 'Lena Schmidt', email: 'lena@hartwellrobotics.com', role: 'Engineer', team: 'Billing', slackHandle: 'lena', githubHandle: 'lschmidt', linearHandle: 'lena' },
  { id: 'person-020', name: 'Olumide Adeyemi', email: 'olumide@hartwellrobotics.com', role: 'Engineer', team: 'Mobile', slackHandle: 'olumide', githubHandle: 'oadeyemi', linearHandle: 'olumide' },
  { id: 'person-021', name: 'Chloe Martin', email: 'chloe@hartwellrobotics.com', role: 'Senior Engineer', team: 'Auth', slackHandle: 'chloe', githubHandle: 'cmartin', linearHandle: 'chloe' },
  { id: 'person-022', name: 'Ryu Nakamura', email: 'ryu@hartwellrobotics.com', role: 'Engineer', team: 'Telemetry', slackHandle: 'ryu', githubHandle: 'rnakamura', linearHandle: 'ryu' },
  { id: 'person-023', name: 'Amara Diallo', email: 'amara@hartwellrobotics.com', role: 'Engineer', team: 'Security', slackHandle: 'amara', githubHandle: 'adiallo', linearHandle: 'amara' },
  { id: 'person-024', name: 'Ben Fitzgerald', email: 'ben@hartwellrobotics.com', role: 'Senior Engineer', team: 'Billing', slackHandle: 'ben', githubHandle: 'bfitz', linearHandle: 'ben' },
  { id: 'person-025', name: 'Nadia Korhonen', email: 'nadia@hartwellrobotics.com', role: 'Engineer', team: 'Auth', slackHandle: 'nadia', githubHandle: 'nkorhonen', linearHandle: 'nadia' },
  { id: 'person-026', name: 'Carlos Reyes', email: 'carlos@hartwellrobotics.com', role: 'Engineer', team: 'Telemetry', slackHandle: 'carlos', githubHandle: 'creyes', linearHandle: 'carlos' },
  { id: 'person-027', name: 'Emma Blackwood', email: 'emma@hartwellrobotics.com', role: 'Engineer', team: 'Platform', slackHandle: 'emma', githubHandle: 'eblackwood', linearHandle: 'emma' },

  // Product (4)
  { id: 'person-028', name: 'Jordan Kim', email: 'jordan@hartwellrobotics.com', role: 'Head of Product', team: 'Product', slackHandle: 'jordan', linearHandle: 'jordan' },
  { id: 'person-029', name: 'Zara Ahmed', email: 'zara@hartwellrobotics.com', role: 'Product Manager', team: 'Product', slackHandle: 'zara', linearHandle: 'zara' },
  { id: 'person-030', name: 'Felix Gruber', email: 'felix@hartwellrobotics.com', role: 'Product Manager', team: 'Product', slackHandle: 'felix', linearHandle: 'felix' },
  { id: 'person-031', name: 'Aisha Mohammed', email: 'aisha@hartwellrobotics.com', role: 'Product Analyst', team: 'Product', slackHandle: 'aisha', linearHandle: 'aisha' },

  // Design (3)
  { id: 'person-032', name: 'Soo-Jin Park', email: 'soojin@hartwellrobotics.com', role: 'Design Lead', team: 'Design', slackHandle: 'soojin', linearHandle: 'soojin' },
  { id: 'person-033', name: 'Marco Ricci', email: 'marco@hartwellrobotics.com', role: 'Product Designer', team: 'Design', slackHandle: 'marco', linearHandle: 'marco' },
  { id: 'person-034', name: 'Ingrid Svensson', email: 'ingrid@hartwellrobotics.com', role: 'UX Researcher', team: 'Design', slackHandle: 'ingrid', linearHandle: 'ingrid' },

  // GTM (6)
  { id: 'person-035', name: 'Tyler Brooks', email: 'tyler@hartwellrobotics.com', role: 'VP Sales', team: 'GTM', slackHandle: 'tyler' },
  { id: 'person-036', name: 'Leila Rahimi', email: 'leila@hartwellrobotics.com', role: 'Account Executive', team: 'GTM', slackHandle: 'leila' },
  { id: 'person-037', name: 'Chidi Eze', email: 'chidi@hartwellrobotics.com', role: 'Solutions Engineer', team: 'GTM', slackHandle: 'chidi' },
  { id: 'person-038', name: 'Valentina Cruz', email: 'valentina@hartwellrobotics.com', role: 'Marketing Lead', team: 'GTM', slackHandle: 'valentina' },
  { id: 'person-039', name: 'Owen Fletcher', email: 'owen@hartwellrobotics.com', role: 'Customer Success', team: 'GTM', slackHandle: 'owen' },
  { id: 'person-040', name: 'Hana Yamamoto', email: 'hana@hartwellrobotics.com', role: 'Marketing Manager', team: 'GTM', slackHandle: 'hana' },
]

export const DEMO_USER: Person = {
  id: 'person-002',
  name: 'Priya Nair',
  email: 'demo@hartwellrobotics.com',
  role: 'CTO & Co-founder',
  team: 'Founders',
  slackHandle: 'priya',
  githubHandle: 'priya-nair',
  linearHandle: 'priya',
}

export const WORKSPACE_ID = 'ws-hartwell-001'
