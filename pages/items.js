import React from 'react';

class Items extends React.Component {
  static async getInitialProps({ query }) {
    const q = query && query.q;
    return { q };
  }
  render() {
    return <div>TODO: search for: {this.props.q}</div>;
  }
}

export default Items;
