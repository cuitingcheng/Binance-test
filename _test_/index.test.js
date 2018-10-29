/* eslint-env jest */

import { shallow, mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import Index from '../pages/index.js'
import Trade from '../pages/trade.js'
const data = [{"symbol":"ETHSGD","quoteAssetName":"SGD","tradedMoney":357.0,"baseAssetUnit":"","baseAssetName":"ETH","baseAsset":"ETH","tickSize":"0.0000001","prevClose":140.0,"activeBuy":0.0,"high":"140.0000000","lastAggTradeId":-1,"low":"140.0000000","matchingUnitType":"STANDARD","close":"140.0000000","quoteAsset":"SGD","productType":null,"active":true,"minTrade":0.01000000,"activeSell":2.55,"withdrawFee":"10","volume":"2.5500000","decimalPlaces":8,"quoteAssetUnit":"","open":"140.0000000","status":"TRADING","minQty":1E-8},{"symbol":"BTCSGD","quoteAssetName":"SGD","tradedMoney":180.6,"baseAssetUnit":"฿","baseAssetName":"Bitcoin","baseAsset":"BTC","tickSize":"0.01","prevClose":53.7,"activeBuy":0.0,"high":"53.70","lastAggTradeId":-1,"low":"1.10","matchingUnitType":"STANDARD","close":"5.00","quoteAsset":"SGD","productType":null,"active":true,"minTrade":0.00000100,"activeSell":57.0,"withdrawFee":"10","volume":"57.00","decimalPlaces":8,"quoteAssetUnit":"","open":"53.70","status":"TRADING","minQty":1E-8}];
const cols = Object.keys(data[0]);

describe('With Enzyme', () => {
  it('h1 shows "可交易货币"', () => {
    const app = shallow(<Index data={data} cols={cols} />);

    expect(app.find('h1').text()).toEqual('可交易货币');
  })
});

describe('With Snapshot Testing', () => {
  it('Index shows list with example data', () => {
    const component = renderer.create(<Index data={data} cols={cols} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});

describe('Route without Symbol', () => {
  it('Trade shows "No Symbol."', () => {
    const app = mount(<Trade router={{query:{symbol:null}}}/>);
    expect(app.find('p').text()).toEqual('No Symbol.');
  })
});
