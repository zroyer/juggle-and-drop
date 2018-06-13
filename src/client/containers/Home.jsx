import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Home extends Component<Props> {
  render = () => {
    const { boards } = this.props;
    return (
      <div style={{padding: 16, textAlign: "center"}}>
        <Helmet>
          <title>juggle & drop</title>
        </Helmet>
        <h1>Pick a board...</h1>
        {boards.map(board => (
          <h3 key={board._id} style={{listStyle: "none"}}>
            <Link
              to={`board/${board._id}`}
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
  boards: Object.values(state.boardsById)
});

export default connect(mapStateToProps)(Home);
