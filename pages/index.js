import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <div>
    <h1>可交易货币</h1>
    <table>
      <tbody>
      <tr>
        {props.cols.map((col) =>
          <th key={col}>{col}</th>
          )}
      </tr>
      {props.data.map((item) => (
        <Link href={`/trade?symbol=${item.symbol}`} key={item.symbol}>
          <tr style={{cursor: 'pointer'}}>
          {props.cols.map((col) =>
            <td key={col}>{item[col]}</td>
          )}
          </tr>
        </Link>
      ))}
      </tbody>
    </table>
  </div>
);

Index.getInitialProps = async function () {
  let res;
  try {
    res = await fetch('https://www.binance.co/exchange/public/product');
  } catch (err) {
    // CORS causing client side fetch to fail. reload page from server.
    window.location.reload();
    return;
  }
  const {data} = await res.json();
  const sample = data[0];
  const cols = Object.keys(sample);
  return {data, cols}
};

export default Index
