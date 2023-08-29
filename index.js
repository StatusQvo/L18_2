const userURL = 'https://api.github.com/user'

const createElement = (userName) => {
  const $liElement = document.createElement('li')
  const $aElement = document.createElement('a')

  $aElement.href = '#'
  $aElement.textContent = userName
  $liElement.append($aElement)
  return $liElement
}

const toggleLoader = () => {
  const $loader = document.querySelector('#loader')
  const isHidden = $loader.getAttribute('hidden') !== null
  if (isHidden) {
    $loader.removeAttribute('hidden')
  } else {
    $loader.setAttribute('hidden', '')
  }
}

const getUsersByIds = (usersId) => {
  const dataContainer = document.querySelector('#data-container')
  toggleLoader()

  Promise.all(usersId.map((id) => fetch(`${userURL}/${id}`)))
    .then((responses) => {
      console.log('[responses]', responses)
      return Promise.all(
        responses
          .filter((response) => response.ok)
          .map((response) => response.json())
      )
    })
    .then((users) => {
      console.log(users)
      const usersArray = Array.isArray(users) ? users : Object.values(users)
      usersArray.forEach((val) => {
        const $liElement = createElement(val.name)
        dataContainer.append($liElement)
      })
    })
    .catch((error) => {
      console.log('error', error)
    })

    .finally(() => {
      toggleLoader()
    })
}

getUsersByIds([5, 6, 2, 1])
