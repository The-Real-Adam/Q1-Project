$(document).ready(() => {
  console.log("jquery ready");

  let token = localStorage.getItem('access_token')
  if (!token) {

    let urlParams = {}

    window.location.href.replace(/^.*#/, '').split('&').map(elem => elem.split('=')).map(arr => urlParams[arr[0]] = arr[1])

    console.log(urlParams);

    token = urlParams.access_token
    localStorage.setItem('access_token', token)

  }

  $("#accesstoken").html(token)

})
