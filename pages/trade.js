import React from 'react';
import {withRouter} from 'next/router'
import Link from "next/link";
class Trade extends React.Component {

  constructor(props) {
    super(props);
    this.symbol = props.router.query.symbol;
    this.state = {
      wssConnected: true,
      lastUpdateId: 0,
      bids: [],
    }
  }

  componentDidMount() {
    this.symbol && this.startNewSocket();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    if (!this.symbol) {
      return <p>No Symbol.</p>
    }
    return(
      <div>
        <Link href="/">
          <a>Back</a>
        </Link>
        <br />
        <p>WebSocket is {this.state.wssConnected ? 'running.' : 'stopped.'}</p>
        <button onClick={this._handleButtonClick}>
          {this.state.wssConnected ? 'Stop' : 'Start'} WebSocket
        </button>
        <p>lastUpdateId: {this.state.lastUpdateId}</p>
        <p>bids:</p>
        {this.state.bids.map((bid, index) =>
          <p key={index}>{bid.toString()}</p>
        )}
      </div>
    )
  }

  _handleButtonClick = () => {
    if (this.state.wssConnected) {
      this.socket.close();
    } else {
      this.startNewSocket();
    }
  };

  startNewSocket = () => {
    this.socket = new WebSocket(`wss://stream.binance.cloud:9443/ws/${this.symbol.toLowerCase()}@depth20`);
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.setState({...data});
    };
    this.socket.onclose = () => {
      this.setState({wssConnected: false});
    };
    this.socket.onopen = () => {
      this.setState({wssConnected: true});
    };
  };
}

export default withRouter(Trade);
