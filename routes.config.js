module.exports = routes = [
  { path: '/', source: './routes/index' },
  { path: '/login', source: './routes/login' },
  { path: '/register', source: './routes/register' },
  { path: '/se-deconnecter', source: './routes/deconnecter' },
  { path: '/utilisateur', source: './routes/client/profile' },
  { path: '/voyages', source: './routes/client/voyages' },
  { path: '/reservations', source: './routes/client/reservations' },
  { path: '/payments', source: './routes/client/payments' },
  { path: '/ticket', source: './routes/client/ticket' },

  { path: '/admin', source: './routes/admin/index' },
  { path: '/admin/utilisateurs', source: './routes/admin/utilisateurs' },
  { path: '/admin/stations', source: './routes/admin/stations' },

  { path: '/chefstation', source: './routes/chefstation/index' },
  { path: '/chefstation/vehicules', source: './routes/chefstation/vehicules' },
  { path: '/chefstation/voyages', source: './routes/chefstation/voyages' },
  { path: '/chefstation/reservations', source: './routes/chefstation/reservations' },
  { path: '/chefstation/notifications', source: './routes/chefstation/notifs' },

  { path: '/a-propos', source: './routes/apropos' },
  { path: '/contact', source: './routes/contact' },
  { path: '/pass-oublie', source: './routes/pass-oublie' },
  { path: '/utilisateur/notifications', source: './routes/client/notifs' }
]