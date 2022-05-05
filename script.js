const currencyMarketList = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
    )

    console.log(response)

    if (response.status === 200) {
      const datos = await response.json()

      let coins = ''
      let body = document.querySelector('.table-body')
      const tableHeadersArray = [
        'name',
        'current_price',
        'ath',
        'ath_change_percentage',
        'circulating_supply',
        'market_cap_rank'
      ]
      datos.forEach(coin => {
        let tableRow = document.createElement('tr')
        tableRow.classList.add(`${coin.id}`)
        let logoTd = document.createElement('td')
        let logoImg = document.createElement('img')
        logoImg.src = `${coin.image}`
        logoTd.appendChild(logoImg)
        tableRow.appendChild(logoTd)
        body.appendChild(tableRow)

        tableHeadersArray.forEach(header => {
          let tableData = document.createElement('td')
          let input = document.createTextNode(`${coin[header]}`)
          tableData.appendChild(input)
          tableData.classList.add(`${header}`)
          tableRow.appendChild(tableData)
        })

        body.appendChild(tableRow)

        selectRow = document.querySelector(`.${coin.id}`)
        selectRow.addEventListener('click', () => {
          document.querySelector('.coinLogo').src = `${coin.image}`
          document.querySelector('.selectedCoin').innerHTML = `${coin.name}`
          document.querySelector('.coins-table').classList.add('displayNone')
          document.querySelector('.calculator').classList.remove('displayNone')
          let userInput = document.querySelector('.coinInput')
          const coinPrice = coin.current_price

          ;['click', 'keyup'].forEach(evento =>
            userInput.addEventListener(evento, () => {
              document.querySelector('.result').innerHTML = `$ ${(
                coinPrice * userInput.value
              ).toFixed(4)}`
            })
          )
          document.querySelector('.arrowSvg').addEventListener('click', () => {
            document.querySelector('.calculator').classList.add('displayNone')
            document
              .querySelector('.coins-table')
              .classList.remove('displayNone')
          })
        })
      })
    } else if (response.status === 404) {
      console.log('The requested data was not found')
    }
  } catch (error) {
    console.log(error)
  }
}

currencyMarketList()
