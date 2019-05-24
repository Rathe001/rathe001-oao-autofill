const styles = {
  '@import': [
    `url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700')`,
    `url('https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700')`,
  ],
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    '*:focus': {
      outline: 'none',
    },
    select: {
      margin: '0 5px 0 0',
    },
    h2: {
      color: '#37435c',
      fontSize: 24,
      padding: 0,
      display: 'inline',
      padding: '2px 0',
      fontWeight: 400,
      margin: 0,
      textTransform: 'uppercase',
      fontFamily: `'Barlow Condensed', Arial, Helvetica, sans-serif`,
    },
  },
  header: {
    fontFamily: `'Barlow Condensed', Arial, Helvetica, sans-serif`,
    background: '#37435c',
    padding: 15,
    fontSize: 18,
    color: '#fff',
    margin: 0,
  },
  btnPrimary: {
    cursor: 'pointer',
    background: '#008ff5',
    color: '#fff',
    margin: '0 5px 0 0',
    borderRadius: 10,
    border: 'none',
    fontFamily: `'Barlow Condensed', Arial, Helvetica, sans-serif`,
    fontSize: 16,
    textTransform: 'uppercase',
    padding: '0 10px 2px 10px',
  },
  'btnPrimary:focus': {
    outline: 'none',
  },
  tools: {
    display: 'flex',
    padding: 15,
    background: '#f2f2f2',
  },
  cellL: {
    flex: 1,
  },
  cellR: {
    flex: 1,
    textAlign: 'right',
  },
  fields: {
    padding: 15,
  },
};

export default styles;
