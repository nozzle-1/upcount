module.exports = {
  name: 'Client',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: true,
    },
    name: {
      type: 'string',
    },
    address: {
      type: 'text',
    },
    emails: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    vatin: {
      type: 'string',
    },
    website: {
      type: 'string',
    },
  },
};
