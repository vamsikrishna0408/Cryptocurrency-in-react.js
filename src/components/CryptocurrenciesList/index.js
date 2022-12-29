import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrencyItem from '../CryptocurrencyItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class CryptoCurrenciesList extends Component {
  state = {currencyList: [], isLoading: true}

  componentDidMount() {
    this.getCurrencyList()
  }

  getCurrencyList = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )

    const data = await response.json()

    const formattedData = data.map(eachItem => ({
      currencyName: eachItem.currency_name,
      usdValue: eachItem.usd_value,
      euroValue: eachItem.euro_value,
      id: eachItem.id,
      currencyLogo: eachItem.currency_logo,
    }))
    this.setState({
      currencyList: formattedData,
      isLoading: false,
    })
  }

  render() {
    const {currencyList, isLoading} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Cryptocurrency Tracker</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
          className="image"
        />
        <div className="currency_view_container">
          <div className="coin-type-header-container">
            <h1 className="coin-type-heading">Coin Type</h1>
            <div className="currency_type_container">
              <h1 className="currency_type_heading">USD</h1>
              <h1 className="currency_type_heading">EURO</h1>
            </div>
          </div>
          {isLoading ? (
            <div className="loader-container" testid="loader">
              <Loader type="Rings" color="#ffffff" height={80} width={80} />
            </div>
          ) : (
            <ul className="crypto-item-container">
              {currencyList.map(eachItem => (
                <CryptocurrencyItem
                  cryptoDetails={eachItem}
                  key={eachItem.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default CryptoCurrenciesList
