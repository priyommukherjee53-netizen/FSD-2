export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const TAGS = {
  Meeting: '#7C9CFF',
  Deadline: '#FF8A7A',
  'Focus block': '#4FD1A5',
  Personal: '#F5B94D',
}

export const initialEvents = [
  { id: 'design-review', day: 'Mon', time: '10:00', title: 'Design review', tag: 'Meeting' },
  { id: 'ship-v23', day: 'Mon', time: '16:00', title: 'Ship v2.3', tag: 'Deadline' },
  { id: '1on1-sam', day: 'Tue', time: '09:30', title: '1:1 with Sam', tag: 'Meeting' },
  { id: 'write-proposal', day: 'Wed', time: '13:00', title: 'Write proposal', tag: 'Focus block' },
  { id: 'client-demo', day: 'Thu', time: '15:00', title: 'Client demo', tag: 'Meeting' },
  { id: 'portfolio-review', day: 'Thu', time: '18:00', title: 'Portfolio review', tag: 'Focus block' },
  { id: 'grocery-run', day: 'Sat', time: '10:00', title: 'Grocery run', tag: 'Personal' },
  { id: 'sprint-planning', day: 'Sun', time: '11:00', title: 'Sprint planning', tag: 'Meeting' },
]
