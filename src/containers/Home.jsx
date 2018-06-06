// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import slugify from 'slugify';

type Props = {
  boards: Array<{ title: string, id: string }>
};

class Home extends Component<Props> {
  render = () => {
    const { boards } = this.props;
    return (
      <div style={{padding: 16, textAlign: "center"}}>
        <Helmet>
          <title>Doing Things</title>
        </Helmet>
        <h1>Pick a board...</h1>
        {boards.map(board => (
          <h3 key={board.id} style={{listStyle: "none"}}>
            <Link
              to={`/${board.id}`}
              >
                {board.title}
              </Link>
          </h3>
          ))}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  boards: Object.values(state.boards)
});

export default connect(mapStateToProps)(Home);
