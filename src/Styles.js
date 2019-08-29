const styles = {
  '@import': [
    "url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700')",
    "url('https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700')",
  ],
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      boxSizing: 'border-box',
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
      display: 'inline',
      padding: '2px 0',
      fontWeight: 400,
      margin: 0,
      textTransform: 'uppercase',
      fontFamily: "'Barlow Condensed', Arial, Helvetica, sans-serif",
    },
    input: {
      padding: '3px 5px',
      width: '100%',
    },
    'button:disabled': {
      background: '#666',
    },
    li: {
      background: '#fff',
    },
    'li:nth-child(even)': {
      background: '#f2f2f2',
    },
  },
};

export default styles;
